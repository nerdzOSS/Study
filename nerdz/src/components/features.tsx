import Image from "next/image";

const features = [
  {
    img: "/features/featureIcon1.svg",
    h3: "Study Notes",
    p: "Access comprehensive notes for all subjects, organized by topics and difficulty levels.",
  },
  {
    img: "/features/featureIcon2.svg",
    h3: "Practice Tests",
    p: "Test your knowledge with hundreds of practice questions and mock exams.",
  },
  {
    img: "/features/featureIcon3.svg",
    h3: "Video Tutorials",
    p: "Watch expert-created video lessons that make complex topics easy to understand.",
  },
  {
    img: "/features/featureIcon4.svg",
    h3: "Study Groups",
    p: "Connect with peers, form study groups, and collaborate on assignments.",
  },
  {
    img: "/features/featureIcon5.svg",
    h3: "Digital Library",
    p: "Browse thousands of e-books, research papers, and reference materials.",
  },
  {
    img: "/features/featureIcon6.svg",
    h3: "Progress Tracking",
    p: "Monitor your learning progress with detailed analytics and performance insights.",
  },
];

export function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Everything in One Place</h2>
        <p className="section-subtitle">
          All the tools and resources you need for academic success
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <Image
                  src={feature.img}
                  alt={feature.h3}
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <h3>{feature.h3}</h3>
              <p>{feature.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
