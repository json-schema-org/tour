"use client";
import { useColorMode } from '@chakra-ui/react';
import styles from './styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
    const { colorMode } = useColorMode();
    const isLightMode = colorMode === 'light';

    return (
        <div
            className={styles.container}
            style={{
                backgroundColor: isLightMode ? '#ffffff' : '#1a202c', // light mode background or dark mode
                color: isLightMode ? '#000000' : '#ffffff' // text color based on mode
            }}
        >
            <h1 className={styles.title}>404 Not Found!</h1>
            <p className={styles.message}>The page you are looking for does not exist!</p>
            <Link href="/">
                <span
                    className={styles.button}
                    style={{
                        color: isLightMode ? '#ffffff' : '#1a202c', // Button text color based on mode
                        backgroundColor: isLightMode ? '#1e3a8a' : 'white' // Button background based on mode
                    }}
                >
                    Back to Home
                </span>
            </Link>
        </div>
    );
}

