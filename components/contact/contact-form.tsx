"use client"

import type React from "react"
import { useState } from "react"
import { Send, Check } from "lucide-react"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {
      name: formState.name ? "" : "Please enter your name",
      email: formState.email
        ? /^\S+@\S+\.\S+$/.test(formState.email)
          ? ""
          : "Please enter a valid email"
        : "Please enter your email",
      message: formState.message ? "" : "Please enter a message",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real implementation, you would send the form data to your backend or email service
    console.log("Form submitted:", formState)

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 5000)
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-gold/30 bg-black/75 backdrop-blur-md p-8 h-full">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M1,1 L1,20 M1,1 L20,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M63,1 L63,20 M63,1 L44,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M1,63 L1,44 M1,63 L20,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M63,63 L63,44 M63,63 L44,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-6 gold-text">Send Us a Message</h2>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4">
              <Check className="text-gold w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2 gold-text">Thank You!</h3>
            <p className="text-white/80">Your message has been sent successfully. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full bg-black/50 border ${
                  errors.name ? "border-pink/50" : "border-gold/30"
                } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-pink text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full bg-black/50 border ${
                  errors.email ? "border-pink/50" : "border-gold/30"
                } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-pink text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-white/90 mb-2 font-medium">
                Subject <span className="text-white/50">(Optional)</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                placeholder="Event Inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white/90 mb-2 font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className={`w-full bg-black/50 border ${
                  errors.message ? "border-pink/50" : "border-gold/30"
                } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300`}
                placeholder="Tell us about your event and how we can help..."
              />
              {errors.message && <p className="mt-1 text-pink text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-navy font-bold py-3 px-6 rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] disabled:opacity-70"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-navy"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
