import Image from "next/image"

export function Footer() {
    return (<footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="logo">
                        <Image src="/navbar/Logo.svg" width={35} height={35} alt="logo"/>                        <span>NerdZ</span>
                    </div>
                    <p>Your complete learning platform</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#resources">Resources</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 NerdZ. All rights reserved. Made with ❤️ by WebVibe</p>
            </div>
        </div>
    </footer>)
}