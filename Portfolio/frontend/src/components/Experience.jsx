import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const HeaderMotion = motion.div;
const MotionLine = motion.div;
const MotionArticle = motion.article;

const ENTRIES = [
  {
    title: "Data Engineer",
    organization: "AKXA Tech Pvt. Ltd.",
    period: "Jan 2026 - Apr 2026",
    detail:
      "Built scalable data pipelines and processing workflows in Python, enabling custom Excel ingestion, transformation, machine learning, and visualization.",
  },
  {
    title: "Software Engineer",
    organization: "AKXA Tech Pvt. Ltd.",
    period: "May 2025 - Aug 2025",
    detail:
      "Engineered a full-stack workforce management system with React, Next.js, Express, and MySQL, featuring automation, dashboards, and user-friendly data visualization.",
  },
  {
    title: "AI/Cloud Solutions Architect",
    organization: "Microsoft Azure & Artificial Intelligence Fundamentals, (WE) Accelerate Program",
    period: "May 2024 - Aug 2024",
    detail:
      "Designed and implemented scalable ML workflows on Azure for an AI-driven investment system with real-time forecasting and personalized insights.",
  },
  {
    title: "Data Analyst",
    organization: "Aqua Alloys Pvt. Ltd.",
    period: "Apr 2023 - Jul 2023",
    detail:
      "Built and optimized SQL/Excel data pipelines, reporting workflows, and validation systems to enhance data accuracy and streamline business operations.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.82", "end 0.18"],
  });

  const progressSmooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 38,
    mass: 0.35,
    restDelta: 0.002,
  });

  const headlineY = useTransform(progressSmooth, [0, 0.28], [40, 0], {
    clamp: true,
  });
  const headlineOpacity = useTransform(progressSmooth, [0, 0.2], [0.4, 1], {
    clamp: true,
  });

  const lineScale = useTransform(progressSmooth, [0.06, 0.88], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="section-inner">
        <HeaderMotion
          className="experience-header"
          style={{
            opacity: headlineOpacity,
            translateY: headlineY,
          }}
        >
          <div className="section-rule" aria-hidden />
          <h2 id="experience-heading" className="section-heading">
            Experience
          </h2>
        </HeaderMotion>

        <div className="experience-block">
          <div className="experience-line-wrap" aria-hidden>
            <div className="experience-line-bg" />
            <MotionLine
              className="experience-line-draw"
              style={{
                scaleY: lineScale,
                transformOrigin: "top center",
              }}
            />
          </div>

          <ul className="experience-rows">
            {ENTRIES.map((entry, index) => (
              <li key={`${entry.period}-${entry.title}`}>
                <ExperienceEntry
                  index={index}
                  progress={progressSmooth}
                  {...entry}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceEntry({ index, progress, title, organization, period, detail }) {
  const stagger = index * 0.16;
  const start = Math.min(0.12 + stagger, 0.74);
  const mid = Math.min(start + 0.24, 0.94);

  const itemY = useTransform(progress, [start, mid], [40, 0], { clamp: true });
  const itemOpacity = useTransform(progress, [start, mid], [0.2, 1], {
    clamp: true,
  });
  const dotScale = useTransform(progress, [start, mid], [0.55, 1], { clamp: true });

  return (
    <MotionArticle
      className="experience-entry"
      style={{
        opacity: itemOpacity,
        translateY: itemY,
      }}
    >
      <motion.span
        className="experience-dot-wrap"
        style={{ scale: dotScale }}
        aria-hidden
      >
        <span className="experience-dot" />
      </motion.span>
      <div className="experience-entry-body">
        <p className="experience-entry-period">{period}</p>
        <h3 className="experience-entry-title">{title}</h3>
        <p className="experience-entry-org">{organization}</p>
        <p className="experience-entry-detail">{detail}</p>
      </div>
    </MotionArticle>
  );
}
