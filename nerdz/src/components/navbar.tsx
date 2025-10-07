'use client';

import Image from "next/image"
import { useTheme } from '../utils/theme';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (<nav className="navbar">
        <div className="container">
            <div className="logo">
                <Image src="/navbar/Logo.svg" width={40} height={40} alt="logo" />
                <span>NerdZ</span>
            </div>
            <ul className="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="/login" className="btn-login">Login</a></li>
            </ul>
            <div className="nav-actions">
                <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
                    {!isDark ? (
                        <Image src="/navbar/Moon.svg" width={10} height={10} alt="moon toggle" />
                    ) : (
                        <Image src="/navbar/Sun.svg" width={10} height={10} alt="sun toggle" />
                    )}
                </button>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>)
}