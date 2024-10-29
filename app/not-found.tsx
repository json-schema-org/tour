"use client";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import styles from './styles/404.module.css';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom404() {
    const { colorMode } = useColorMode();
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', colorMode);
    }, [colorMode]);

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
