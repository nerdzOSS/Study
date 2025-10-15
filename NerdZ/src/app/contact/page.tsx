'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Show success toast
    showToast('Message sent successfully!', 'success');

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add to container
    const container = document.getElementById('toastContainer');
    if (container) {
      container.appendChild(toast);

      // Remove after 5 seconds
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }
  };

  return (
    <>
      <Navigation />

      {/* Animated Background */}
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            We&apos;d Love to Hear From You
          </div>
          <h1 className="hero-title">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="hero-description">
            Have a question or feedback? We&apos;re here to help. Send us a message and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-form-section">
            <div className="form-card">
              <div className="form-header">
                <h2>Send a Message</h2>
                <p>Fill out the form and we&apos;ll be in touch soon</p>
              </div>

              <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <input
                      type="text"
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    placeholder="Tell us more about what you need..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
                  <span id="submitText" style={{ display: isSubmitting ? 'none' : 'inline' }}>Send Message</span>
                  <span id="submitLoader" style={{ display: isSubmitting ? 'inline-flex' : 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3"></circle>
                      <path d="M12 2 A10 10 0 0 1 22 12" className="spinner"></path>
                    </svg>
                    Sending...
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="submit-icon">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p className="info-value">support@nerdz.com</p>
                <p className="info-detail">We reply within 24 hours</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p className="info-value">+1 (555) 123-4567</p>
                <p className="info-detail">Mon-Fri: 9AM - 6PM PST</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Visit Us</h3>
                <p className="info-value">123 Study Street<br />San Francisco, CA 94102</p>
                <p className="info-detail">Drop by anytime!</p>
              </div>
            </div>

            <div className="info-card social-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                  Twitter
                </a>
                <a href="#" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
                <a href="#" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                  </svg>
                  Discord
                </a>
                <a href="#" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reasons-section">
        <div className="section-header">
          <h2 className="section-title">Why Reach Out?</h2>
          <p className="section-subtitle">We&apos;re here for you, every step of the way</p>
        </div>
        <div className="reasons-grid">
          <div className="reason-card">
            <div className="reason-icon">💡</div>
            <h3>Feature Requests</h3>
            <p>Have an idea? We love hearing suggestions from our community!</p>
          </div>
          <div className="reason-card">
            <div className="reason-icon">🐛</div>
            <h3>Report a Bug</h3>
            <p>Found an issue? Let us know so we can fix it quickly.</p>
          </div>
          <div className="reason-card">
            <div className="reason-icon">🤝</div>
            <h3>Partnerships</h3>
            <p>Interested in collaborating? We&apos;d love to work with you.</p>
          </div>
          <div className="reason-card">
            <div className="reason-icon">❓</div>
            <h3>General Inquiry</h3>
            <p>Any other questions? Don&apos;t hesitate to ask!</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-icon">💬</div>
          <h2 className="cta-title">Prefer Live Chat?</h2>
          <p className="cta-description">Join our Discord community for instant support and connect with fellow students</p>
          <a href="#" className="btn btn-primary btn-large" id="join-dis">
            <span>Join Discord Community</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo-container">
              <Image src="/logo.jpeg" alt="NerdZ Logo" className="logo" width={32} height={32} />
              <span className="brand-name">NerdZ</span>
            </div>
            <p className="footer-description">Making study easier and more engaging for students worldwide.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="/features">Features</a>
            <a href="/how-it-works">How It Works</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="/help-center">Help Center</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NerdZ. Open Source & Free Forever.</p>
        </div>
      </footer>

      <div className="toast-container" id="toastContainer"></div>
    </>
  );
}
