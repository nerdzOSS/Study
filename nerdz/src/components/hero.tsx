import Image from "next/image"
export function Hero(){
    return (    <section className="hero">
        <div className="container">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Everything You Need to <span className="highlight">Excel</span> in Your Studies</h1>
                    <p>Access notes, resources, study materials, and tools all in one place. Join thousands of students achieving their academic goals.</p>
                    <div className="hero-buttons">
                        <a href="/login" className="btn btn-primary">Get Started Free</a>
                        <a href="#features" className="btn btn-secondary">Explore Features</a>
                    </div>
                </div>
                <div className="hero-illustration">
<Image src="/Hero.svg" alt="Hero" width={500} height={400}/>
                </div>
            </div>
        </div>
    </section>)
}