"use client";

/**
 * Navbar — Top navigation bar with brand, theme toggle, and developer link.
 * Opaque, sticky, separated from pipeline stages.
 */
import styles from "./Navbar.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Left: Brand */}
        <a href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="yntern logo" width={28} height={28} className={styles.logoImage} />
          <span className={styles.brandName}>yntern</span>
          <span className={styles.brandBlock} aria-hidden="true" />
        </a>

        {/* Right: Actions */}
        <div className={styles.actions}>
          <ThemeToggle />
          <span className={styles.divider} aria-hidden="true" />
          <a
            href="https://www.murthy0x05.me"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
          >
            Wanna know who developed this?
          </a>
        </div>
      </div>
    </nav>
  );
}
