export default function ContactInfo() {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gold/30 bg-black/75 backdrop-blur-md p-8">
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
        <h2 className="text-3xl font-display font-bold mb-6 gold-text">Contact Information</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <a
              href="mailto:info@vibesupply.com"
              className="text-gold hover:text-gold-light transition-colors duration-300"
            >
              info@vibesupply.com
            </a>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
            <a href="tel:+441234567890" className="text-gold hover:text-gold-light transition-colors duration-300">
              +44 123 456 7890
            </a>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Office Hours</h3>
            <p className="text-white/80">Monday - Friday: 9am - 6pm</p>
            <p className="text-white/80">Saturday: 10am - 4pm</p>
            <p className="text-white/80">Sunday: Closed</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-black/50 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-black/50 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-black/50 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
