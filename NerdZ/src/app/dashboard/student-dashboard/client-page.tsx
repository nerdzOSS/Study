'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { handleSignOutAction } from '@/app/actions/signOut';

// Server-side user data interface
interface UserData {
  id: string;
  firstName: string | null;
  metadata?: {
    type?: string;
  };
}

// Props interface for the client component
interface StudentDashboardProps {
  userData: UserData | null;
  role: string | null;
}

export default function StudentDashboard({ userData, role }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState('study');
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      // If no user data, redirect to login
      router.push('/login');
      return;
    }

    // Check user role and set redirect destination
    if (!role) {
      setShouldRedirect('/role-selection');
    } else if (role === 'teacher') {
      setShouldRedirect('/dashboard/teachers-dashboard');
    }
  }, [userData, role, router]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(shouldRedirect);
    }
  }, [shouldRedirect, router]);

  if (!userData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (shouldRedirect) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Redirecting...</p>
      </div>
    );
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

      <div className="student-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>📚 Learning Hub</h3>
            <button className="sidebar-close">✕</button>
          </div>
          <div className="sidebar-menu">
            <button
              className={`menu-item ${activeSection === 'study' ? 'active' : ''}`}
              onClick={() => setActiveSection('study')}
            >
              <span className="menu-icon">📊</span>
              <span>Study</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'class-selection' ? 'active' : ''}`}
              onClick={() => setActiveSection('class-selection')}
            >
              <span className="menu-icon">🎯</span>
              <span>Select Class</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'study-materials' ? 'active' : ''}`}
              onClick={() => setActiveSection('study-materials')}
            >
              <span className="menu-icon">📖</span>
              <span>Study Materials</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'video-lectures' ? 'active' : ''}`}
              onClick={() => setActiveSection('video-lectures')}
            >
              <span className="menu-icon">🎥</span>
              <span>Video Lectures</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'ai-assistant' ? 'active' : ''}`}
              onClick={() => setActiveSection('ai-assistant')}
            >
              <span className="menu-icon">🤖</span>
              <span>AI Assistant</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveSection('quiz')}
            >
              <span className="menu-icon">📝</span>
              <span>AI Quiz</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveSection('schedule')}
            >
              <span className="menu-icon">📅</span>
              <span>My Schedule</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'pomodoro' ? 'active' : ''}`}
              onClick={() => setActiveSection('pomodoro')}
            >
              <span className="menu-icon">⏱️</span>
              <span>Pomodoro Timer</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveSection('notes')}
            >
              <span className="menu-icon">✍️</span>
              <span>My Notes</span>
            </button>
            <button
              className={`menu-item ${activeSection === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveSection('progress')}
            >
              <span className="menu-icon">📈</span>
              <span>Progress</span>
            </button>
          </div>
        </aside>

        <main className="main-content">
          <section className={`content-section ${activeSection === 'study' ? 'active' : ''}`}>
            {/* Top Header */}
            <div className="main-header">
              <div className="header-left">
                <h1 className="dashboard-title">Hello, <span className="gradient-text user-name">{userData?.firstName || 'Student'}</span>! 👋</h1>
                <p className="dashboard-subtitle">Ready to make today productive?</p>
              </div>
              <div className="header-right">
                <div className="search-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input type="text" placeholder="Search..." />
                </div>
                <button className="theme-toggle-btn">
                  <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </button>
                <button className="notification-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="notification-dot"></span>
                </button>
                <button
                  className="notification-btn"
                  onClick={handleSignOutAction}
                  title="Logout"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card purple">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <span className="stat-value">15 Days</span>
                  <span className="stat-label">Study Streak</span>
                </div>
                <div className="stat-trend positive">+2 days</div>
              </div>
              <div className="stat-card blue">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <span className="stat-value">4.5h</span>
                  <span className="stat-label">Today&apos;s Time</span>
                </div>
                <div className="stat-trend positive">+30min</div>
              </div>
              <div className="stat-card green">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <span className="stat-value">8/10</span>
                  <span className="stat-label">Tasks Done</span>
                </div>
                <div className="stat-trend neutral">2 left</div>
              </div>
              <div className="stat-card pink">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-value">92%</span>
                  <span className="stat-label">Avg Score</span>
                </div>
                <div className="stat-trend positive">+5%</div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="content-grid">
              {/* Schedule Card */}
              <div className="content-card schedule-card">
                <div className="card-header">
                  <h3>📅 Today&apos;s Schedule</h3>
                  <span className="card-badge">3 classes</span>
                </div>
                <div className="schedule-list">
                  <div className="schedule-item ongoing">
                    <div className="time-badge ongoing">Now</div>
                    <div className="schedule-content">
                      <div className="schedule-time">09:00 AM - 10:30 AM</div>
                      <h4>Mathematics - Calculus</h4>
                      <p>Room 204 • Prof. Johnson</p>
                      <div className="schedule-progress">
                        <div className="progress-fill" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="schedule-item upcoming">
                    <div className="time-badge">11:00 AM</div>
                    <div className="schedule-content">
                      <div className="schedule-time">11:00 AM - 01:00 PM</div>
                      <h4>Physics Lab</h4>
                      <p>Lab 3 • Prof. Smith</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="time-badge">02:00 PM</div>
                    <div className="schedule-content">
                      <div className="schedule-time">02:00 PM - 03:00 PM</div>
                      <h4>Computer Science</h4>
                      <p>Room 101 • Prof. Davis</p>
                    </div>
                  </div>
                </div>
                <button className="card-action-btn">View Full Schedule →</button>
              </div>

              {/* Assignments Card */}
              <div className="content-card assignments-card">
                <div className="card-header">
                  <h3>⚡ Urgent Assignments</h3>
                  <span className="card-badge urgent">5 pending</span>
                </div>
                <div className="assignments-list">
                  <div className="assignment-item critical">
                    <div className="assignment-priority"></div>
                    <div className="assignment-content">
                      <h4>Math Assignment #5</h4>
                      <p>Calculus problems 1-20</p>
                      <div className="assignment-footer">
                        <span className="due-time">⏰ 6 hours left</span>
                        <span className="points">50 pts</span>
                      </div>
                    </div>
                    <button className="assignment-btn">Start</button>
                  </div>
                  <div className="assignment-item warning">
                    <div className="assignment-priority"></div>
                    <div className="assignment-content">
                      <h4>Physics Lab Report</h4>
                      <p>Thermodynamics experiment</p>
                      <div className="assignment-footer">
                        <span className="due-time">⏰ Due tomorrow</span>
                        <span className="points">100 pts</span>
                      </div>
                    </div>
                    <button className="assignment-btn">Start</button>
                  </div>
                  <div className="assignment-item normal">
                    <div className="assignment-priority"></div>
                    <div className="assignment-content">
                      <h4>CS Project</h4>
                      <p>Binary search tree implementation</p>
                      <div className="assignment-footer">
                        <span className="due-time">⏰ 3 days left</span>
                        <span className="points">150 pts</span>
                      </div>
                    </div>
                    <button className="assignment-btn">Start</button>
                  </div>
                </div>
                <button className="card-action-btn">View All Assignments →</button>
              </div>

              {/* Progress Card */}
              <div className="content-card progress-card">
                <div className="card-header">
                  <h3>📊 Weekly Progress</h3>
                  <span className="card-badge success">On track</span>
                </div>
                <div className="progress-list">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Study Hours</span>
                      <span className="progress-value">28/30h</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar purple" style={{ width: '93%' }}>
                        <span className="progress-label">93%</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Assignments</span>
                      <span className="progress-value">15/18</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar pink" style={{ width: '83%' }}>
                        <span className="progress-label">83%</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Course Completion</span>
                      <span className="progress-value">12/15</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar green" style={{ width: '80%' }}>
                        <span className="progress-label">80%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="section-header">
              <div>
                <h2>📚 Continue Learning</h2>
                <p>Pick up where you left off</p>
              </div>
              <a href="#" className="view-all-btn">View All →</a>
            </div>

            <div className="courses-grid">
              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon purple">📐</div>
                  <div className="course-badge progress">65%</div>
                </div>
                <h3>Advanced Mathematics</h3>
                <p>Chapter 5: Calculus Fundamentals</p>
                <div className="course-progress">
                  <div className="course-progress-fill purple" style={{ width: '65%' }}></div>
                </div>
                <div className="course-footer">
                  <span>12 lessons</span>
                  <span>⏱️ 3.5h</span>
                </div>
                <button className="course-btn">Continue</button>
              </div>

              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon blue">🧪</div>
                  <div className="course-badge progress">40%</div>
                </div>
                <h3>Physics</h3>
                <p>Module 3: Thermodynamics</p>
                <div className="course-progress">
                  <div className="course-progress-fill blue" style={{ width: '40%' }}></div>
                </div>
                <div className="course-footer">
                  <span>18 lessons</span>
                  <span>⏱️ 5.2h</span>
                </div>
                <button className="course-btn">Continue</button>
              </div>

              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon green">💻</div>
                  <div className="course-badge complete">85%</div>
                </div>
                <h3>Computer Science</h3>
                <p>Unit 4: Data Structures</p>
                <div className="course-progress">
                  <div className="course-progress-fill green" style={{ width: '85%' }}></div>
                </div>
                <div className="course-footer">
                  <span>4 lessons</span>
                  <span>⏱️ 1.5h</span>
                </div>
                <button className="course-btn">Continue</button>
              </div>

              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon pink">🌍</div>
                  <div className="course-badge new">New</div>
                </div>
                <h3>Geography</h3>
                <p>Chapter 1: Climate Change</p>
                <div className="course-progress">
                  <div className="course-progress-fill pink" style={{ width: '10%' }}></div>
                </div>
                <div className="course-footer">
                  <span>24 lessons</span>
                  <span>⏱️ 8.0h</span>
                </div>
                <button className="course-btn">Start Course</button>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="bottom-grid">
              <div className="content-card grades-card">
                <div className="card-header">
                  <h3>📈 Recent Grades</h3>
                  <a href="#" className="view-all-link">View All →</a>
                </div>
                <div className="grades-list">
                  <div className="grade-item excellent">
                    <div className="grade-subject">
                      <span className="subject-icon">📐</span>
                      <div>
                        <h4>Mathematics Quiz #5</h4>
                        <p>Yesterday</p>
                      </div>
                    </div>
                    <div className="grade-score">95%</div>
                  </div>
                  <div className="grade-item good">
                    <div className="grade-subject">
                      <span className="subject-icon">🧪</span>
                      <div>
                        <h4>Physics Lab Report</h4>
                        <p>2 days ago</p>
                      </div>
                    </div>
                    <div className="grade-score">88%</div>
                  </div>
                  <div className="grade-item excellent">
                    <div className="grade-subject">
                      <span className="subject-icon">💻</span>
                      <div>
                        <h4>CS Assignment #3</h4>
                        <p>3 days ago</p>
                      </div>
                    </div>
                    <div className="grade-score">92%</div>
                  </div>
                </div>
              </div>

              <div className="content-card quick-actions-card">
                <div className="card-header">
                  <h3>⚡ Quick Actions</h3>
                </div>
                <div className="quick-actions-grid">
                  <button className="quick-action-btn">
                    <span className="action-icon">📝</span>
                    <span>Create Note</span>
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">⏱️</span>
                    <span>Start Timer</span>
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">📅</span>
                    <span>Add Event</span>
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">💬</span>
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
