import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './HomeScreen.module.css';
import type { HomePageContent } from '@/types/contentful';

interface HomeScreenProps {
  content: HomePageContent;
}

export function HomeScreen({ content }: HomeScreenProps) {
  return (
    <>
      <div className={styles.heroWrapper}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>#AsteraAI</div>

          <h1 className={styles.title}>
            {documentToReactComponents(content.heroSectionHeading)}
          </h1>

          <p className={styles.subtitle}>
            {content.heroSectionParagraph}
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryButton}>Request Demo</button>
            <button className={styles.secondaryButton}>
              Get Instant Access For 14 Days
            </button>
          </div>
        </div>

        <div className={styles.heroIllustration}>
          {/* Static placeholder for the illustration on the right */}
          <div className={styles.illustrationCard}>
            <div className={styles.illustrationLogo}>A</div>
            <div className={styles.illustrationBlocks}>
              <div className={styles.blockRow}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.blockRow}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <section className={styles.visionSection}>
        <div className={styles.visionInner}>
          <h2 className={styles.sectionTitle}>Astera&apos;s Vision</h2>
          <p className={styles.sectionLead}>
            Astera&apos;s vision is to empower data professionals with accessible data management
            tools that offer the functionality and flexibility to integrate data, data warehousing
            capabilities, and data profiling and validation features in a single, unified, no-code,
            easy-to-use platform.
          </p>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <h3 className={styles.storyTitle}>The Astera Story</h3>
            <p>
              In 2010, Astera was a consulting firm for clients in the mortgage banking sector. Our
              software had a component that allowed customers to bring together data from different
              sources. When the mortgage sector crashed, one customer came to Astera and asked us to
              expand that component into a data management software that could allow them to manage
              their data in one centralized location. With that, Astera was born again.
            </p>
            <p>
              Astera&apos;s main goal was to make this software easy for everyone to access and use,
              since many of the people who needed to access the data did not have technical
              backgrounds. Because of this, we developed a no-code, drag-and-drop interface that is
              still used in all of our products today, from our data warehouse builder to our
              unstructured data extraction tool to our API designer.
            </p>
            <p>
              Astera is dedicated to creating products that allow professionals to skip the hassle of
              data busywork and let their data shine like a star at the forefront of their company&apos;s
              innovation. After all, Astera comes from the Greek word Aster, meaning &apos;star&apos;.
            </p>
          </div>

        <div className={styles.storyMedia}>
          <img
            className={styles.storyMainImage}
            src="https://cdn-ajfbi.nitrocdn.com/GuYcnotRkcKfJXshTEEKnCZTOtUwxDnm/assets/images/optimized/rev-cdc4f02/www.astera.com/wp-content/uploads/2025/07/ADPB.png"
            alt="Astera dataflow designer with agent assistance"
          />
        </div>
        </div>
      </section>
    </>
  );
}

