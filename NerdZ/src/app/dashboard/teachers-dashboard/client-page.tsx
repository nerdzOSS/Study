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
interface TeachersDashboardProps {
  userData: UserData | null;
  role: string | null;
}

export default function Teachers({ userData, role }: TeachersDashboardProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
    } else if (role === 'student') {
      setShouldRedirect('/dashboard/student-dashboard');
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

      <main className="content-teacher-container">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1 className="page-title">Content <span className="gradient-text">Dashboard</span></h1>
            <p className="page-subtitle">Upload and manage study materials for students</p>
            <div className="teacher-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Content Provider</span>
            </div>
          </div>
          <div className="quick-actions">
            <button
              className="btn btn-primary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload Notes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              Upload Material
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleSignOutAction}
              title="Logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card purple-stat">
            <div className="stat-content">
              <div className="stat-info">
                <span className="stat-label">Total Uploads</span>
                <span className="stat-value">42</span>
                <span className="stat-trend positive">↑ 8 this week</span>
              </div>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">📚</div>
              </div>
            </div>
          </div>
          <div className="stat-card blue-stat">
            <div className="stat-content">
              <div className="stat-info">
                <span className="stat-label">Total Views</span>
                <span className="stat-value">1,248</span>
                <span className="stat-trend positive">↑ 124 today</span>
              </div>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">👁️</div>
              </div>
            </div>
          </div>
          <div className="stat-card green-stat">
            <div className="stat-content">
              <div className="stat-info">
                <span className="stat-label">Total Downloads</span>
                <span className="stat-value">856</span>
                <span className="stat-trend positive">↑ 67 this week</span>
              </div>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">⬇️</div>
              </div>
            </div>
          </div>
          <div className="stat-card pink-stat">
            <div className="stat-content">
              <div className="stat-info">
                <span className="stat-label">Active Students</span>
                <span className="stat-value">156</span>
                <span className="stat-trend">Across 4 classes</span>
              </div>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">🎓</div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-tabs">
          <div className="tabs-container">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span className="tab-icon">📁</span>
              <span className="tab-text">All Content</span>
              <span className="tab-count">42</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <span className="tab-icon">📝</span>
              <span className="tab-text">Notes</span>
              <span className="tab-count">28</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              <span className="tab-icon">📚</span>
              <span className="tab-text">Materials</span>
              <span className="tab-count">14</span>
            </button>
          </div>
        </section>

        <section className="content-grid">
          <div className="content-card" data-type="notes" data-subject="physics">
            <div className="content-card-header">
              <div className="file-type-badge notes-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Notes
              </div>
              <div className="dropdown">
                <button className="menu-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
            <div className="content-card-body">
              <div className="file-icon">📄</div>
              <h3 className="content-title">Thermodynamics Chapter Notes</h3>
              <p className="content-description">Complete notes for chapters 5-7 covering heat transfer and entropy</p>
              <div className="content-meta">
                <span className="subject-tag">Physics</span>
                <span className="class-tag">Class 12-A</span>
              </div>
              <div className="content-stats">
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>245 views</span>
                </div>
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>89 downloads</span>
                </div>
              </div>
              <div className="upload-info">
                <span className="upload-date">Uploaded 3 days ago</span>
                <span className="file-size">2.4 MB</span>
              </div>
            </div>
          </div>

          <div className="content-card" data-type="materials" data-subject="mathematics">
            <div className="content-card-header">
              <div className="file-type-badge material-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Material
              </div>
              <div className="dropdown">
                <button className="menu-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
            <div className="content-card-body">
              <div className="file-icon">📊</div>
              <h3 className="content-title">Calculus Practice Problems</h3>
              <p className="content-description">200+ solved problems with step-by-step solutions</p>
              <div className="content-meta">
                <span className="subject-tag">Mathematics</span>
                <span className="class-tag">Class 12-B</span>
              </div>
              <div className="content-stats">
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>412 views</span>
                </div>
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>156 downloads</span>
                </div>
              </div>
              <div className="upload-info">
                <span className="upload-date">Uploaded 1 week ago</span>
                <span className="file-size">5.8 MB</span>
              </div>
            </div>
          </div>

          <div className="content-card" data-type="notes" data-subject="chemistry">
            <div className="content-card-header">
              <div className="file-type-badge notes-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Notes
              </div>
              <div className="dropdown">
                <button className="menu-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
            <div className="content-card-body">
              <div className="file-icon">🧪</div>
              <h3 className="content-title">Organic Chemistry Reactions</h3>
              <p className="content-description">Key reactions and mechanisms with examples</p>
              <div className="content-meta">
                <span className="subject-tag">Chemistry</span>
                <span className="class-tag">Class 11-A</span>
              </div>
              <div className="content-stats">
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>198 views</span>
                </div>
                <div className="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>72 downloads</span>
                </div>
              </div>
              <div className="upload-info">
                <span className="upload-date">Uploaded 2 days ago</span>
                <span className="file-size">1.9 MB</span>
              </div>
            </div>
          </div>
        </section>

        <section className="restrictions-notice">
          <div className="notice-card">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h4>Account Permissions</h4>
              <p>As a Content Provider, you can upload and manage study materials and notes. For test creation and scheduling features, please contact the administrator.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📤 Upload Content</h2>
              <button className="close-modal" onClick={() => setIsUploadModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form className="modal-form">
              <div className="form-section">
                <h3 className="form-section-title">Content Details</h3>
                <div className="form-group">
                  <label>Content Type <span className="required">*</span></label>
                  <select required>
                    <option value="">Select Type</option>
                    <option value="notes">Notes</option>
                    <option value="material">Study Material</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Title <span className="required">*</span></label>
                  <input type="text" placeholder="e.g., Thermodynamics Chapter Notes" required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Brief description of the content..."></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Subject <span className="required">*</span></label>
                    <select required>
                      <option value="">Select Subject</option>
                      <option>Physics</option>
                      <option>Mathematics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Computer Science</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Class <span className="required">*</span></label>
                    <select required>
                      <option value="">Select Class</option>
                      <option>Class 12-A</option>
                      <option>Class 12-B</option>
                      <option>Class 11-A</option>
                      <option>Class 11-B</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Upload File</h3>
                <div className="upload-area">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <h4>Drop files here or click to browse</h4>
                  <p>Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 50MB)</p>
                  <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" hidden />
                  <button type="button" className="btn btn-secondary">Browse Files</button>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span className="btn-text">Upload Content</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
