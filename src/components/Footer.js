"use client";

/**
 * Footer — Site footer with developer credit.
 */
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        yntern is developed with ❤️ by{" "}
        <a
          href="https://www.murthy0x05.me"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Pavan
        </a>
      </p>
    </footer>
  );
}
