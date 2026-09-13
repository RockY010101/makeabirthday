import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Birthdays, but make them unforgettable.
        </h1>
        
        <p className={styles.subtitle}>
          Create an interactive birthday experience with animations, memories, games, surprises, and your own personal touch.
        </p>
        
        <div className={styles.ctaGroup}>
          <Link href="/dashboard" className={styles.primaryButton}>
            Create a Birthday
          </Link>
          <Link href="/explore" className={styles.secondaryButton}>
            Explore Experiences
          </Link>
        </div>
      </div>
    </main>
  );
}
