import type { BlogCta } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { useEffect } from 'react';

type Props = {
  cta: BlogCta;
};

export function BlogCtaSection({ cta }: Props) {
  // Debug: Log what we receive
  useEffect(() => {
    console.log('[BlogCtaSection] Received CTA props:', {
      id: cta.id,
      title: cta.title,
      description: cta.description,
      text: cta.text,
      link: cta.link,
      fullCta: cta
    });
  }, [cta]);

  if (!cta.title && !cta.text) {
    console.warn('[BlogCtaSection] No title or text found, not rendering CTA');
    return null;
  }

  const descriptionRenderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="blog-cta-description-text">{children}</p>
      ),
    },
  };

  // Ensure we have text or link to show button
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
            {!hasButton && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>
                [DEBUG] Button not rendered - text: &quot;{cta.text}&quot;, link: &quot;{cta.link}&quot;
              </div>
            )}
            </div>
            <div className="blog-cta-image-section">
              <img
                src="/images/blogcta.svg"
                alt="CTA Illustration"
                className="blog-cta-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
