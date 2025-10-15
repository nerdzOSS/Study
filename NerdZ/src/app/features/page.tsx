import Navigation from '@/components/Navigation';

export default function Features() {
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
            Powerful Features
          </div>
          <h1 className="hero-title">
            Everything You Need to<br />
            <span className="gradient-text">Succeed Academically</span>
          </h1>
          <p className="hero-description">
            Discover the comprehensive suite of tools designed to make your learning journey more effective, engaging, and enjoyable.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Core Features</h2>
          <p className="section-subtitle">Powerful tools to enhance your learning experience</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Powered Assistant</h3>
            <p className="feature-description">Get instant help with your doubts and personalized study recommendations powered by advanced AI technology.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">Study Materials Hub</h3>
            <p className="feature-description">Access a vast library of organized study materials, notes, and resources all in one convenient location.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3 className="feature-title">Smart Study Timer</h3>
            <p className="feature-description">Built-in Pomodoro technique with customizable intervals to maximize your focus and productivity.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Progress Analytics</h3>
            <p className="feature-description">Track your learning progress with detailed analytics, streaks, and performance insights.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3 className="feature-title">Focus Music Player</h3>
            <p className="feature-description">Curated playlists and ambient sounds designed specifically to enhance concentration and reduce distractions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3 className="feature-title">Interactive Quizzes</h3>
            <p className="feature-description">AI-generated quizzes and practice tests to reinforce your understanding and identify knowledge gaps.</p>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Advanced Capabilities</h2>
          <p className="section-subtitle">Cutting-edge features for the modern student</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Customizable Interface</h3>
            <p className="feature-description">Personalize your learning environment with themes, layouts, and settings that match your preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Privacy & Security</h3>
            <p className="feature-description">Your data is protected with enterprise-grade security. We never share your personal information.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Cross-Platform Sync</h3>
            <p className="feature-description">Access your study materials and progress across all your devices with seamless synchronization.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Achievement System</h3>
            <p className="feature-description">Stay motivated with badges, streaks, and rewards that celebrate your learning milestones.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3 className="feature-title">Study Groups</h3>
            <p className="feature-description">Collaborate with classmates, join study groups, and participate in peer learning communities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Detailed Reports</h3>
            <p className="feature-description">Comprehensive reports on your study patterns, strengths, weaknesses, and improvement areas.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Experience These Features?</h2>
          <p className="cta-description">Join thousands of students already using NerdZ to enhance their learning</p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary btn-large">
              <span>Start Learning Today</span>
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
