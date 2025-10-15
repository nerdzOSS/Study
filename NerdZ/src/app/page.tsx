import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
   const { user } = await withAuth();
   if(user){
    return redirect("/dashboard");
   }
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
            Open Source • Free Forever
          </div>
          <h1 className="hero-title">
            Study Smarter,<br />
            <span className="gradient-text">Not Harder</span>
          </h1>
          <p className="hero-description">
            Your all-in-one study platform designed for students who want to level up their learning game.
            Track progress, stay focused, and make studying actually enjoyable.
          </p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary">
              <span>Get Started</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Active Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Teachers</span>
            </div>
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Study Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <div className="card-icon">📚</div>
            <div className="card-text">
              <div className="card-title">Study Materials</div>
              <div className="card-subtitle">Organized & Easy</div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">⏱️</div>
            <div className="card-text">
              <div className="card-title">Pomodoro Timer</div>
              <div className="card-subtitle">Stay Focused</div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">📈</div>
            <div className="card-text">
              <div className="card-title">Track Progress</div>
              <div className="card-subtitle">See Your Growth</div>
            </div>
          </div>
          <div className="phone-mockup">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="screen-carousel">
                  <div className="screen-content active">
                    <div className="app-header">
                      <div className="time">9:41</div>
                      <div className="status-icons">📶 📡 🔋</div>
                    </div>
                    <div className="app-body">
                      <h2 className="app-title">📚 Study Dashboard</h2>
                      <div className="study-stats">
                        <div className="stat-box">
                          <div className="stat-icon">🔥</div>
                          <div className="stat-info">
                            <div className="stat-value">15</div>
                            <div className="stat-name">Day Streak</div>
                          </div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-icon">⏱️</div>
                          <div className="stat-info">
                            <div className="stat-value">4.5h</div>
                            <div className="stat-name">Today</div>
                          </div>
                        </div>
                      </div>
                      <div className="progress-card">
                        <div className="progress-header">Weekly Goal</div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '75%' }}></div>
                        </div>
                        <div className="progress-text">75% Complete</div>
                      </div>
                    </div>
                  </div>
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="time">9:41</div>
                      <div className="status-icons">📶 📡 🔋</div>
                    </div>
                    <div className="app-body">
                      <h2 className="app-title">🎵 Lofi Player</h2>
                      <div className="music-player">
                        <div className="album-art">🎧</div>
                        <div className="song-info">
                          <div className="song-name">Chill Beats</div>
                          <div className="artist-name">Study Session Mix</div>
                        </div>
                        <div className="player-controls">
                          <div className="control-btn">⏮️</div>
                          <div className="control-btn play">▶️</div>
                          <div className="control-btn">⏭️</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="time">9:41</div>
                      <div className="status-icons">📶 📡 🔋</div>
                    </div>
                    <div className="app-body">
                      <h2 className="app-title">⏰ Pomodoro</h2>
                      <div className="timer-display">
                        <div className="timer-circle">
                          <div className="timer-text">25:00</div>
                          <div className="timer-label">Focus Time</div>
                        </div>
                        <button className="start-btn">Start Session</button>
                      </div>
                    </div>
                  </div>
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="time">9:41</div>
                      <div className="status-icons">📶 📡 🔋</div>
                    </div>
                    <div className="app-body">
                      <h2 className="app-title">📈 Progress</h2>
                      <div className="achievement-list">
                        <div className="achievement">
                          <div className="achievement-icon">🏆</div>
                          <div className="achievement-text">
                            <div className="achievement-name">First Week</div>
                            <div className="achievement-desc">Completed 7 days</div>
                          </div>
                        </div>
                        <div className="achievement">
                          <div className="achievement-icon">⭐</div>
                          <div className="achievement-text">
                            <div className="achievement-name">Night Owl</div>
                            <div className="achievement-desc">50 study sessions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="time">9:41</div>
                      <div className="status-icons">📶 📡 🔋</div>
                    </div>
                    <div className="app-body">
                      <h2 className="app-title">📝 Notes</h2>
                      <div className="notes-list">
                        <div className="note-card">
                          <div className="note-title">Math - Chapter 5</div>
                          <div className="note-preview">Quadratic equations and formulas...</div>
                        </div>
                        <div className="note-card">
                          <div className="note-title">Physics Notes</div>
                          <div className="note-preview">Newton&apos;s laws of motion...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle">Powerful features designed to make studying engaging and effective</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Powered Assistant</h3>
            <p className="feature-description">Get instant help with your doubts and personalized study recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Customizable Interface</h3>
            <p className="feature-description">Make it yours with themes, colors, and layouts that match your vibe</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">Visualize your improvement with detailed analytics and test history</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3 className="feature-title">Lofi Music Player</h3>
            <p className="feature-description">Study with curated playlists designed to boost your concentration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3 className="feature-title">Smart Timers</h3>
            <p className="feature-description">Pomodoro technique, alarms, and reminders to keep you on track</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Rewards System</h3>
            <p className="feature-description">Earn badges and achievements to stay motivated and engaged</p>
          </div>
        </div>
      </section>

      {/* User Type Section */}
      <section className="user-types">
        <div className="section-header">
          <h2 className="section-title">Built for Students & Teachers</h2>
          <p className="section-subtitle">Two powerful experiences, one amazing platform</p>
        </div>
        <div className="user-cards">
          <div className="user-card student-card">
            <div className="user-card-header">
              <div className="user-icon">🎓</div>
              <h3>For Students</h3>
            </div>
            <ul className="user-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Access unlimited study materials
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create personal notes & mind maps
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Take tests and track your scores
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Get study tips and motivation
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Connect with your teachers
              </li>
            </ul>
            <Link href="/login" className="btn btn-primary">Sign Up as Student</Link>
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
                Upload & organize study materials
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Schedule tests and quizzes
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Monitor student progress
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create personalized timetables
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Connect with students easily
              </li>
            </ul>
            <Link href="/login" className="btn btn-secondary">Sign Up as Teacher</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Study Game?</h2>
          <p className="cta-description">Join thousands of students already studying smarter with NerdZ</p>
          <div className="cta-buttons">
            <Link href="/login" className="btn btn-primary btn-large">
              <span>Get Started Free</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
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
            <h4>Community</h4>
            <a href="#">GitHub</a>
            <a href="#">Discord</a>
            <a href="#">Twitter</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#">Documentation</a>
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
