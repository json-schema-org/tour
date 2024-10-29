// pages/404.tsx

import styles from './styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 Not Found!</h1>
            <p className={styles.message}>The page you are looking for does not exist!</p>
            <Link href="/">
                <span className={styles.button}>Back to Home</span>
            </Link>
        </div>
    );
}
