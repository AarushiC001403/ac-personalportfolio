import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ProjectCard from "./ProjectCard";

const ProjectsHeaderMotion = motion.div;

const SAMPLE_PROJECTS = [
  {
    title: "Investo",
    description:
      "A full-stack investment advisory platform with a structured recommendation engine, real-time insights, and an AI chatbot for user interaction.",
    accent: "a",
    image:
      "https://plus.unsplash.com/premium_vector-1728554164249-f973141236f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW52ZXN0bWVudCUyMGFuaW1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    githubUrl: "https://github.com/AarushiC001403/Investment_project",
  },
  {
    title: "DataPilot",
    description:
      "A React and Python data analysis app for Excel processing, custom formulas, and aggregations.",
    accent: "b",
    image:
      "https://plus.unsplash.com/premium_vector-1682310925148-79b2d439b5ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YSUyMGFuYWx5c2lzJTIwYW5pbWF0aW9ufGVufDB8fDB8fHww",
    githubUrl: "https://github.com/AarushiC001403/Data_Analysis_Project",
  },
  {
    title: "Worker Management System prototype",
    description:
      "A full-stack workforce management platform with centralized records, automated alerts and reporting, compliance dashboards, and interactive data visualization.",
    accent: "c",
    image:
      "https://plus.unsplash.com/premium_vector-1682269171829-9bac81f32e1d?q=80&w=2266&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "https://github.com/AarushiC001403/worker-management-system",
  },
  {
    title: "Watopoly",
    description:
      "A modular game engine for a Monopoly-style game set on the University of Waterloo campus, with dynamic gameplay systems, persistence, and deterministic testing.",
    accent: "d",
    image:
      "https://images.unsplash.com/photo-1703248184387-f6b2cbe1c981?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "https://github.com/AarushiC001403/Watopoly",
  },
  {
    title: "Calculator",
    description:
      "A modular calculator app for daily use",
    accent: "e",
    image:
      "https://plus.unsplash.com/premium_vector-1682301001357-2ce3f1740043?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvciUyMGFuaW1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    githubUrl: "https://github.com/AarushiC001403/Calculator",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    /**
     * Complete the timeline while the Projects section is still visible.
     * Using a mid-viewport "end" avoids waiting until the next section
     * (Contact) starts to enter the viewport.
     */
    offset: ["start end", "end 0.55"],
  });

  /** Spring makes motion read clearly on shorter sections and fast scrolling */
  const progressSmooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 40,
    mass: 0.3,
    restDelta: 0.002,
  });

  const headlineY = useTransform(progressSmooth, [0, 0.22], [48, 0], {
    clamp: true,
  });
  const headlineOpacity = useTransform(progressSmooth, [0, 0.18], [0.35, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-section-inner section-inner">
        <ProjectsHeaderMotion
          className="projects-header"
          style={{
            opacity: headlineOpacity,
            translateY: headlineY,
          }}
        >
          <div className="section-rule" aria-hidden />
          <h2 id="projects-heading" className="section-heading">
            Projects
          </h2>
        </ProjectsHeaderMotion>

        <div className="projects-grid">
          {SAMPLE_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              index={index}
              scrollProgress={progressSmooth}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
