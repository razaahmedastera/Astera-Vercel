import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './HomeScreen.module.css';
import type { PageContent } from '@/types/contentful';

interface HomeScreenProps {
  content: PageContent;
}

export function HomeScreen({ content }: HomeScreenProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.body}>{content.body}</p>
      <div className={styles.richText}>
        {documentToReactComponents(content.randomText)}
      </div>
    </div>
  );
}

