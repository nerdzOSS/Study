'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

// Server-side user data interface
interface UserData {
  id: string;
  firstName: string | null;
  metadata?: {
    type?: string;
  };
}

// Props interface for the client component
interface RoleSelectionProps {
  userData: UserData | null;
  role: string | null;
}

export default function RoleSelection({ userData, role }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      // User not logged in, redirect to login
      router.push('/login');
      return;
    }

    if (role) {
      // User already has a role, redirect to appropriate dashboard
      if (role === 'teacher') {
        router.push('/dashboard/teachers-dashboard');
      } else if (role === 'student') {
        router.push('/dashboard/student-dashboard');
      }
      return;
    }
  }, [userData, role, router]);

  const handleRoleSelection = async (role: 'student' | 'teacher') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/set-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        // Redirect to appropriate dashboard
        if (role === 'teacher') {
          router.push('/dashboard/teachers-dashboard');
        } else {
          router.push('/dashboard/student-dashboard');
        }
      } else {
        console.error('Failed to set role');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error setting role:', error);
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Redirecting to login...</p>
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

      <div className="role-selection-container">
        <div className="role-selection-card">
          <div className="role-selection-header">
            <h1 className="role-selection-title">Welcome to NerdZ! 👋</h1>
            <p className="role-selection-subtitle">Let&apos;s get you set up. Are you a student or a teacher?</p>
          </div>

          <div className="role-options">
            <button
              className={`role-option ${selectedRole === 'student' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('student')}
              disabled={isLoading}
            >
              <div className="role-icon">🎓</div>
              <div className="role-content">
                <h3>Student</h3>
                <p>Access study materials, track progress, and stay organized</p>
              </div>
              <div className="role-checkmark">✓</div>
            </button>

            <button
              className={`role-option ${selectedRole === 'teacher' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('teacher')}
              disabled={isLoading}
            >
              <div className="role-icon">👨‍🏫</div>
              <div className="role-content">
                <h3>Teacher</h3>
                <p>Upload materials, manage content, and help students learn</p>
              </div>
              <div className="role-checkmark">✓</div>
            </button>
          </div>

          <div className="role-selection-actions">
            <button
              className="btn btn-primary btn-large"
              onClick={() => selectedRole && handleRoleSelection(selectedRole)}
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3"></circle>
                    <path d="M12 2 A10 10 0 0 1 22 12" className="spinner-path"></path>
                  </svg>
                  Setting up your account...
                </>
              ) : (
                <>
                  Continue to Dashboard
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
