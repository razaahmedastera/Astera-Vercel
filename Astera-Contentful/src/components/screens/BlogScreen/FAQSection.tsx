import type { FAQSection } from '@/types/contentful';
import { FAQAccordion } from './FAQAccordion';

interface FAQSectionProps {
  faqSection: FAQSection;
}

export function FAQSection({ faqSection }: FAQSectionProps) {
  if (!faqSection || !faqSection.items || faqSection.items.length === 0) {
    return null;
  }

  return (
    <div className="blog-faq-section">
      <h2 className="blog-faq-heading">{faqSection.heading || 'Frequently Asked Questions'}</h2>
      <FAQAccordion items={faqSection.items} />
    </div>
  );
}
