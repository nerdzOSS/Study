'use client';

import Image from "next/image"
import { useTheme } from '../../utils/theme';

export default function Login(){
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (    <div className="login-container">
        <div className="login-illustration">
            <Image src="/LoginIllustration.svg" alt="Login Illustration" width={50} height={50} />
        </div>

        <div className="login-form-container">
            <div className="login-header">
                <a href="/" className="back-link">
<Image src="/login/BackArrow.svg" width={20} height={20} alt="back arrow" />
                    Back to Home
                </a>
                <div className="header-actions">
                    <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
                        {!isDark ? (
                            <Image src="/login/MoonIcon.svg" width={20} height={20} alt="moon toggle" />
                        ) : (
                            <Image src="/login/SunIcon.svg" width={20} height={20} alt="sun toggle" />
                        )}
                    </button>
                    <div className="logo-small">
<Image src="/login/LoginLogo.svg" width={40} height={40} alt="logo" />
                    </div>
                </div>
            </div>

            <div className="login-form-wrapper">
                <h1>Sign In</h1>
                <p className="login-subtitle">Enter your credentials to access your account</p>

                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
<Image src="/login/EmailIcon.svg" width={20} height={20} alt="email" className="input-icon" />
                            <input type="email" id="email" placeholder="student@example.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
<Image src="/login/PasswordIcon.svg" width={20} height={20} alt="password" className="input-icon" />
                            <input type="password" id="password" placeholder="Enter your password" required />
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" id="remember"/>
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">Sign In</button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="btn-social btn-google">
<Image src="/login/GoogleIcon.svg" width={20} height={20} alt="google" />
                            Continue with Google
                        </button>
                    </div>
                </form>

                <p className="signup-link">Don't have an account? <a href="#">Sign Up</a></p>
            </div>

            <div className="login-footer">
                <p>&copy; 2025 NerdZ. All rights reserved.</p>
            </div>
        </div>
    </div>)
}