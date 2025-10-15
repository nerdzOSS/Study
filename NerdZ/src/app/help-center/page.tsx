import Navigation from '@/components/Navigation';

export default function HelpCenter() {
  return (
    <>
      <Navigation />

      {/* Animated Background */}
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            We&apos;re Here to Help
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Help Center</span>
          </h1>
          <p className="hero-description">
            Find answers to common questions, browse guides, or contact our support team.
          </p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Find quick answers to your questions</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Getting Started</h3>
            <p className="feature-description">Learn the basics and set up your account</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3 className="feature-title">Account & Profile</h3>
            <p className="feature-description">Manage your account settings and preferences</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">Courses & Learning</h3>
            <p className="feature-description">Everything about courses and study materials</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Assignments & Tests</h3>
            <p className="feature-description">How to submit and track your assignments</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3 className="feature-title">Technical Support</h3>
            <p className="feature-description">Troubleshooting and technical issues</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3 className="feature-title">Billing & Payments</h3>
            <p className="feature-description">Questions about pricing and payments</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="features-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="feature-card">
            <h3 className="feature-title">How do I create an account?</h3>
            <p className="feature-description">Click the &quot;Get Started&quot; button, choose Student or Teacher, and fill in your email and password. You&apos;ll be ready to go in seconds!</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">How do I reset my password?</h3>
            <p className="feature-description">Click &quot;Forgot Password&quot; on the login page, enter your email, and we&apos;ll send you a reset link.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Can I use NerdZ on mobile?</h3>
            <p className="feature-description">Yes! NerdZ is fully responsive and works perfectly on all devices - desktop, tablet, and mobile.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">How do I contact support?</h3>
            <p className="feature-description">Visit our Contact page or email us at support@nerdz.com. We typically respond within 24 hours.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Is my data secure?</h3>
            <p className="feature-description">Absolutely! We use industry-standard encryption and never share your data with third parties.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Still Need Help?</h2>
          <p className="cta-description">Our support team is ready to assist you</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary btn-large">
              <span>Contact Support</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo-container">
              <span className="brand-name">NerdZ</span>
            </div>
            <p className="footer-description">Making study easier and more engaging for students worldwide.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="/features">Features</a>
            <a href="/how-it-works">How It Works</a>
            <a href="/pricing">Pricing</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/help-center">Help Center</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="/help-center">Documentation</a>
            <a href="/help-center">Help Center</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NerdZ. Open Source & Free Forever.</p>
        </div>
      </footer>
    </>
  );
}
