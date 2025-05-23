import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected shape of the request body
interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  recaptchaToken?: string;
  recaptchaAction?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequestBody;
    const { name, email, subject, message, recaptchaToken, recaptchaAction } = body;

    if (!recaptchaToken || !recaptchaAction) {
      return NextResponse.json({ error: 'Missing reCAPTCHA token or action' }, { status: 400 });
    }

    // Verify reCAPTCHA token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const expectedAction = process.env.RECAPTCHA_V3_EXPECTED_ACTION || "contact_form_submit";
    const scoreThreshold = parseFloat(process.env.RECAPTCHA_V3_SCORE_THRESHOLD || "0.5");

    if (!secretKey) {
      console.error('Missing RECAPTCHA_SECRET_KEY environment variable');
      return NextResponse.json({ error: 'Server configuration error (reCAPTCHA)' }, { status: 500 });
    }

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    
    try {
      const recaptchaResponse = await fetch(verificationURL, { method: 'POST' });
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        console.warn('reCAPTCHA verification failed (success: false):', recaptchaData['error-codes']);
        return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
      }
      
      // Verify action and score for v3
      // If Google reports an action, it must match. If Google doesn't report an action (e.g., undefined),
      // we proceed, relying on the score and success status. This handles cases where the frontend
      // reCAPTCHA library might not explicitly send an action with executeAsync for v3.
      if (recaptchaData.action !== undefined && recaptchaData.action !== expectedAction) {
        console.warn(`reCAPTCHA action mismatch. Expected: ${expectedAction}, Google reported: ${recaptchaData.action}. Action sent by client: ${recaptchaAction}`);
        return NextResponse.json({ error: 'reCAPTCHA action mismatch.' }, { status: 400 });
      } else if (recaptchaData.action === undefined) {
        console.warn(`Google did not report a reCAPTCHA action. Proceeding based on score. Expected: ${expectedAction}, Action sent by client: ${recaptchaAction}`);
      }

      if (recaptchaData.score < scoreThreshold) {
        console.warn(`reCAPTCHA score too low. Score: ${recaptchaData.score}, Threshold: ${scoreThreshold}`);
        // You might choose to still process the message but flag it, or outright reject it.
        // For now, we reject it.
        return NextResponse.json({ error: 'reCAPTCHA score too low. Please try again.' }, { status: 400 });
      }

      // Optional: check hostname if configured in reCAPTCHA admin
      // if (recaptchaData.hostname !== expectedHostname) { ... }

    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      return NextResponse.json({ error: 'Failed to verify reCAPTCHA. Please try again later.' }, { status: 500 });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format (simple regex)
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_SECURE,
      EMAIL_USER,
      EMAIL_PASS,
      CONTACT_FORM_RECEIVER_EMAIL,
      FROM_NAME = 'Vibe Supply Music',
      FROM_EMAIL = process.env.EMAIL_USER, // Default to EMAIL_USER if FROM_EMAIL is not set
      EMAIL_SUBJECT_PREFIX = 'New inquiry from Vibe Supply Music'
    } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !CONTACT_FORM_RECEIVER_EMAIL) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      secure: EMAIL_SECURE === 'true', // true for 465, false for other ports (like 587 with STARTTLS)
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      // Add timeout options if needed
      // connectionTimeout: 5000, // 5 seconds
      // greetingTimeout: 5000, // 5 seconds
      // socketTimeout: 5000, // 5 seconds
    });

    // Verify transporter connection (optional, but good for debugging)
    try {
      await transporter.verify();
      console.log('Nodemailer transporter connected successfully.');
    } catch (error) {
      console.error('Nodemailer transporter connection error:', error);
      return NextResponse.json({ error: 'Failed to connect to email server.' }, { status: 500 });
    }
    
    // Email to your company
    const companyMailOptions = {
      from: `"${name}" <${email}>`, // Show user's name and email as sender for easy reply
      to: CONTACT_FORM_RECEIVER_EMAIL,
      subject: subject ? `${EMAIL_SUBJECT_PREFIX}: ${subject}` : `${EMAIL_SUBJECT_PREFIX}: Message from ${name}`,
      text: `You have received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nMessage:\n${message}`,
      html: `<p>You have received a new message from your website contact form:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
             ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    // "Thank you" email to the user
    const userMailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Thank you for contacting ${FROM_NAME}!`,
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe ${FROM_NAME} Team`,
      html: `<p>Hi ${name},</p>
             <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
             <p>Best regards,<br>The ${FROM_NAME} Team</p>`,
    };

    // Send emails
    try {
      await transporter.sendMail(companyMailOptions);
      console.log('Email to company sent successfully.');
      await transporter.sendMail(userMailOptions);
      console.log('Thank you email to user sent successfully.');
      
      return NextResponse.json({ success: true, message: 'Emails sent successfully!' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      // It's possible one email sent and the other failed. Consider more granular error handling if needed.
      return NextResponse.json({ error: 'Failed to send one or more emails.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Contact form API error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 