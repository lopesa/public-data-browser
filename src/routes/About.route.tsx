import styles from "styles/About.module.scss";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h3>About</h3>
      <p>I am an Engineer who needed a side project...</p>
      <p>Interesting stuff I've found:</p>
      <a href="https://rath.kanaries.net/" target="_blank" rel="noreferrer">
        https://rath.kanaries.net/
      </a>
    </div>
  );
}
