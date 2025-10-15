import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function HowItWorks() {
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
            Simple & Effective
          </div>
          <h1 className="hero-title">
            How <span className="gradient-text">NerdZ</span><br />
            Works
          </h1>
          <p className="hero-description">
            Get started in minutes and transform your study experience. Here&apos;s how NerdZ makes learning easier.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Getting Started in 4 Simple Steps</h2>
          <p className="section-subtitle">Join thousands of students in just a few minutes</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="step-number">1</div>
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">Create Your Account</h3>
            <Link href="/login" className="feature-description">Sign up for free in seconds. Choose whether you&apos;re a student or teacher, and you&apos;re ready to go!</Link>
          </div>

          <div className="feature-card">
            <div className="step-number">2</div>
            <div className="feature-icon">⚙️</div>
            <h3 className="feature-title">Set Up Your Profile</h3>
            <p className="feature-description">Add your courses, set study goals, customize your dashboard, and personalize your learning experience.</p>
          </div>

          <div className="feature-card">
            <div className="step-number">3</div>
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">Start Learning</h3>
            <p className="feature-description">Access study materials, create notes, use the pomodoro timer, and track your progress in real-time.</p>
          </div>

          <div className="feature-card">
            <div className="step-number">4</div>
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Track & Improve</h3>
            <p className="feature-description">Monitor your analytics, earn achievements, compete on leaderboards, and continuously improve!</p>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section className="user-types">
        <div className="section-header">
          <h2 className="section-title">For Students</h2>
          <p className="section-subtitle">Your complete learning companion</p>
        </div>
        <div className="user-cards">
          <div className="user-card student-card">
            <div className="user-card-header">
              <div className="user-icon">🎓</div>
              <h3>Daily Study Workflow</h3>
            </div>
            <ul className="user-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Check your schedule and upcoming classes
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Review assignments and deadlines
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Start focused study sessions with timer
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Take notes and create study materials
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Track progress and earn achievements
              </li>
            </ul>
          </div>

          <div className="user-card teacher-card">
            <div className="user-card-header">
              <div className="user-icon">👨‍🏫</div>
              <h3>For Teachers</h3>
            </div>
            <ul className="user-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Upload study materials and resources
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create and schedule assignments
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Monitor student progress & grades
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Generate automated timetables
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Communicate with students easily
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">Join thousands of students already studying smarter with NerdZ</p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary btn-large">
              <span>Start Free Today</span>
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
