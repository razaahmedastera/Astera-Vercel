import Image from 'next/image';
import type { BlogCta } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

type Props = {
  cta: BlogCta;
};

export function BlogCtaSection({ cta }: Props) {
  if (!cta.title && !cta.text) {
    return null;
  }

  const descriptionRenderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="blog-cta-description-text">{children}</p>
      ),
    },
  };

  const hasButton = cta.text || cta.link;
  const buttonText = cta.text || 'Learn More';
  const buttonLink = cta.link || '#';

  return (
    <div className="blog-cta-wrapper">
      <div className="blog-cta-section my-12 rounded-xl overflow-hidden">
        <div className="blog-cta-container">
          <div className="blog-cta-content">
            <div className="blog-cta-text-section">
              {cta.title && (
                <h3 className="blog-cta-title">
                  {cta.title}
                </h3>
              )}
              {cta.description && (
                <div className="blog-cta-description">
                  {documentToReactComponents(cta.description, descriptionRenderOptions)}
                </div>
              )}
              {hasButton && (
                <a
                  href={buttonLink}
                  target={buttonLink && buttonLink !== '#' && buttonLink.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="blog-cta-button"
                >
                  {buttonText}
                </a>
              )}
            </div>
            <div className="blog-cta-image-section">
              <Image
                src="/images/blogcta.svg"
                alt="CTA Illustration"
                width={400}
                height={300}
                className="blog-cta-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
