import { motion, useTransform } from "framer-motion";

const MotionArticle = motion.article;
const MotionAnchor = motion.a;

/** Rolling windows along scroll progress — overlap keeps motion visible mid-scroll */
function segmentInputs(index) {
  const anchor = Math.max(0, 0.03 + index * 0.16);
  const peak = Math.min(anchor + 0.42, 0.92);
  return [anchor, peak];
}

function ProjectCardContent({ title, description, image, accent }) {
  return (
    <>
      <div className={`project-card-media project-card-media--${accent}`}>
        {image ? (
          <img
            src={image}
            alt=""
            className="project-card-image"
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <div className="project-card-shine" aria-hidden />
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>
      </div>
    </>
  );
}

export default function ProjectCard({
  index,
  scrollProgress,
  title,
  description,
  accent,
  image,
  githubUrl,
}) {
  const [anchor, peak] = segmentInputs(index);
  const baseLift = 24 + index * 14;

  const translateY = useTransform(
    scrollProgress,
    [anchor, peak],
    [baseLift, 0],
    { clamp: true },
  );

  const opacity = useTransform(
    scrollProgress,
    [anchor, anchor + Math.min((peak - anchor) * 0.52, 0.28)],
    [0.1, 1],
    { clamp: true },
  );

  const scale = useTransform(
    scrollProgress,
    [anchor, peak],
    [0.9 + index * 0.02, 1],
    { clamp: true },
  );

  const cardClass = `project-card project-card--${accent}${githubUrl ? " project-card--link" : ""}`;
  const cardStyle = {
    opacity,
    translateY,
    scale,
  };

  const content = (
    <ProjectCardContent
      title={title}
      description={description}
      image={image}
      accent={accent}
    />
  );

  if (githubUrl) {
    return (
      <MotionAnchor
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        style={cardStyle}
        initial={false}
        aria-label={`Open ${title} project`}
      >
        {content}
      </MotionAnchor>
    );
  }

  return (
    <MotionArticle className={cardClass} style={cardStyle} initial={false}>
      {content}
    </MotionArticle>
  );
}
