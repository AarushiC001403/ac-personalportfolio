export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner section-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Hi, I&apos;m Aarushi Choudhary.</h1>
          <div id="about" className="about-block scroll-target">
            <p className="hero-lede">
              I&apos;m a third-year Computer Science student at the University of Waterloo interested in software, data, and how they intersect. 
              I enjoy solving problems, understanding systems deeply, and building solutions that combine analytical thinking with creativity.
            </p>
          </div>
          <div className="hero-links">
            <a 
              href="/Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Resume
            </a>
            <a
              href="https://github.com/AarushiC001403"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aarushi-choudhary/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-frame">
            <img
              src="/profile.png"
              alt="Aarushi Choudhary"
              className="hero-photo-image"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
