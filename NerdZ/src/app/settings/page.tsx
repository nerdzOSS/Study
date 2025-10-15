'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <>
      <Navigation />

      {/* Animated Background */}
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Main Content */}
      <main className="settings-container">
        {/* Sidebar Navigation */}
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            <button
              className={`settings-nav-item ${activeSection === 'general' ? 'active' : ''}`}
              onClick={() => setActiveSection('general')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6"></path>
              </svg>
              <span>General</span>
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveSection('notifications')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span>Notifications</span>
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveSection('privacy')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Privacy & Security</span>
            </button>
            <button
              className={`settings-nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveSection('preferences')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6"></path>
              </svg>
              <span>Preferences</span>
            </button>
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="settings-content">
          {/* General Section */}
          {activeSection === 'general' && (
            <section className="settings-section active">
              <div className="section-header">
                <h2 className="section-title">General Settings</h2>
                <p className="section-subtitle">Basic app configuration</p>
              </div>

              <div className="settings-card">
                <h3 className="card-title">App Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Version</span>
                    <span className="info-value">1.0.0</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Build</span>
                    <span className="info-value">2024.1</span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Data Management</h3>
                <div className="action-item">
                  <div className="action-info">
                    <h4 className="action-title">Clear Cache</h4>
                    <p className="action-desc">Remove temporary files and cached data</p>
                  </div>
                  <button className="btn btn-secondary">Clear</button>
                </div>
              </div>
            </section>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <section className="settings-section active">
              <div className="section-header">
                <h2 className="section-title">Notification Preferences</h2>
                <p className="section-subtitle">Control how you receive notifications</p>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Email Notifications</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>New Student Submissions</h4>
                      <p>Get notified when students submit tests or assignments</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Upcoming Tests Reminder</h4>
                      <p>Receive reminders about scheduled tests and quizzes</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Weekly Summary</h4>
                      <p>Receive a weekly report of your teaching activities</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Push Notifications</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Enable Push Notifications</h4>
                      <p>Receive notifications in your browser</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Sound</h4>
                      <p>Play a sound when you receive a notification</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <section className="settings-section active">
              <div className="section-header">
                <h2 className="section-title">Privacy & Security</h2>
                <p className="section-subtitle">Manage your privacy and security settings</p>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Two-Factor Authentication</h3>
                <div className="two-factor-status">
                  <div className="status-badge disabled">Disabled</div>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="btn btn-primary">Enable 2FA</button>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Privacy Settings</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Profile Visibility</h4>
                      <p>Allow students to view your profile</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Show Online Status</h4>
                      <p>Let students see when you&apos;re online</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <section className="settings-section active">
              <div className="section-header">
                <h2 className="section-title">Preferences</h2>
                <p className="section-subtitle">Customize your teaching experience</p>
              </div>

              <div className="settings-card">
                <h3 className="card-title">Language & Region</h3>
                <form className="settings-form">
                  <div className="form-group">
                    <label>Language</label>
                    <select>
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Timezone</label>
                      <select>
                        <option>EST - Eastern Time</option>
                        <option>PST - Pacific Time</option>
                        <option>CST - Central Time</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date Format</label>
                      <select>
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
