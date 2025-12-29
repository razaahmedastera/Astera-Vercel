import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <Link href="/">
              <img 
                src="/images/astera-logo.svg" 
                alt="Astera Logo" 
                className={styles.footerLogoImage}
                loading="lazy"
                width="120"
                height="32"
              />
            </Link>
          </div>
          <p className={styles.footerTagline}>AI-Powered Data Platform</p>
          <p className={styles.footerCopyright}>© 2025 Astera. All rights reserved.</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Product</h4>
            <Link href="/product" className={styles.footerLink}>Products</Link>
            <a href="#features" className={styles.footerLink}>Features</a>
            <a href="#" className={styles.footerLink}>Pricing</a>
            <a href="#" className={styles.footerLink}>API</a>
            <a href="#" className={styles.footerLink}>Documentation</a>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Company</h4>
            <a href="#" className={styles.footerLink}>About</a>
            <a href="#" className={styles.footerLink}>Blog</a>
            <a href="#" className={styles.footerLink}>Careers</a>
            <a href="#contact" className={styles.footerLink}>Contact</a>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Resources</h4>
            <a href="#" className={styles.footerLink}>Help Center</a>
            <a href="#" className={styles.footerLink}>Community</a>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

