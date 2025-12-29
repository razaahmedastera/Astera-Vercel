'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link href="/">
            <img 
              src="/images/astera-logo.svg" 
              alt="Astera Logo" 
              className={styles.logoImage}
              loading="eager"
              width="120"
              height="32"
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/product" 
            className={`${styles.navLink} ${pathname === '/product' ? styles.active : ''}`}
          >
            Products
          </Link>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#solutions" className={styles.navLink}>Solutions</a>
          <a href="#use-cases" className={styles.navLink}>Use Cases</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.loginButton}>Login</button>
          <button className={styles.signupButton}>Start Free Trial</button>
        </div>
      </div>
    </header>
  );
}

