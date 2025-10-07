import Image from "next/image"

export function About(){
    return (    <section id="about" className="about">
        <div className="container">
            <div className="about-content">
                <div className="about-illustration">
                    <Image
                        src="/about/AboutIllustration.svg"
                        alt="About Illustration"
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                <div className="about-text">
                    <h2>Built for Students, By Students</h2>
                    <p>We understand the challenges students face. That's why we created NerdZ - a comprehensive platform that brings together everything you need to succeed academically.</p>
                    <ul className="about-list">
                        <li>
<Image src="/about/CheckIcon1.svg" width={24} height={24} alt="check" />
                            <span>10,000+ Active Students</span>
                        </li>
                        <li>
<Image src="/about/CheckIcon2.svg" width={24} height={24} alt="check" />
                            <span>5,000+ Study Resources</span>
                        </li>
                        <li>
<Image src="/about/CheckIcon3.svg" width={24} height={24} alt="check" />
                            <span>Available 24/7</span>
                        </li>
                        <li>
<Image src="/about/CheckIcon4.svg" width={24} height={24} alt="check" />
                            <span>100% Free to Start</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>)
}