import { useTheme } from "../context/useTheme";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <a href="#home" className="logo-mark" aria-label="Home">
        <span className="logo-monogram">AC</span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        <ul className="site-nav-list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="site-nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="theme-toggle-icon" aria-hidden>
          {isDark ? "☀︎" : "☾"}
        </span>
      </button>
    </header>
  );
}
