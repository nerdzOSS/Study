import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Navigation />

      {/* Animated Background */}
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Our Story
          </div>
          <h1 className="hero-title">
            Making Education<br />
            <span className="gradient-text">Accessible to All</span>
          </h1>
          <p className="hero-description">
            NerdZ was created by students, for students. We believe learning should be engaging, accessible, and free for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Our Mission & Vision</h2>
          <p className="section-subtitle">What drives us every day</p>
        </div>
        <div className="user-cards">
          <div className="user-card student-card">
            <div className="user-card-header">
              <div className="user-icon">🎯</div>
              <h3>Our Mission</h3>
            </div>
            <p className="feature-description">
              To provide students worldwide with a free, comprehensive study platform that makes learning enjoyable,
              organized, and effective. We&apos;re committed to democratizing education through technology.
            </p>
          </div>

          <div className="user-card teacher-card">
            <div className="user-card-header">
              <div className="user-icon">🚀</div>
              <h3>Our Vision</h3>
            </div>
            <p className="feature-description">
              To become the world&apos;s most loved study platform, empowering millions of students to achieve their
              academic goals and unlock their full potential through innovative, accessible tools.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">NerdZ by the Numbers</h2>
          <p className="section-subtitle">Our growing community</p>
        </div>
        <div className="hero-stats" style={{ justifyContent: 'center' }}>
          <div className="stat">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Active Students</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Expert Teachers</span>
          </div>
          <div className="stat">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Study Hours</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Why Choose NerdZ</h2>
          <p className="section-subtitle">What makes us different</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3 className="feature-title">100% Free</h3>
            <p className="feature-description">No hidden fees, no subscriptions, no paywalls. Quality education should be accessible to everyone.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔓</div>
            <h3 className="feature-title">Open Source</h3>
            <p className="feature-description">Built by the community, for the community. Transparent, secure, and continuously improving.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Student-Focused</h3>
            <p className="feature-description">Designed with actual student needs in mind. Every feature solves a real problem.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Privacy First</h3>
            <p className="feature-description">Your data belongs to you. We never sell your information or compromise your privacy.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Fast & Reliable</h3>
            <p className="feature-description">Lightning-fast performance, 99.9% uptime, and reliable infrastructure you can count on.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3 className="feature-title">Global Community</h3>
            <p className="feature-description">Connect with students worldwide. Share knowledge, collaborate, and grow together.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join Our Growing Community</h2>
          <p className="cta-description">Be part of the education revolution</p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary btn-large">
              <span>Get Started Free</span>
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
              <Image src="/logo.jpeg" alt="NerdZ Logo" className="logo" width={32} height={32} />
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
