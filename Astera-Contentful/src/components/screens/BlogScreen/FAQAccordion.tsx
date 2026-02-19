'use client';

import { useState } from 'react';
import type { FAQItem } from '@/types/contentful';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    // Always keep one item open - if clicking the same item, don't close it
    // If clicking a different item, open that one
    if (openIndex !== index) {
      setOpenIndex(index);
    }
    // If clicking the same item, do nothing (keep it open)
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="blog-faq-list">
      {items.map((faq, index) => (
        <div key={index} className={`blog-faq-item ${openIndex === index ? 'blog-faq-item-open' : ''}`}>
          <button
            className="blog-faq-question"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
          >
            <span className="blog-faq-question-text">{faq.question}</span>
            <svg
              className={`blog-faq-icon ${openIndex === index ? 'blog-faq-icon-open' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className={`blog-faq-answer ${openIndex === index ? 'blog-faq-answer-open' : ''}`}>
            <div className="blog-faq-answer-content">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
