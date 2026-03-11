import type { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import SmartLink from '@/components/ui/SmartLink/SmartLink';

interface KeyTakeawaysSectionProps {
  keyTakeaways: Document;
}

export function KeyTakeawaysSection({ keyTakeaways }: KeyTakeawaysSectionProps) {
  if (!keyTakeaways || !keyTakeaways.nodeType || keyTakeaways.nodeType !== 'document') {
    return null;
  }

  // Check if the document has actual content (not just empty structure)
  const hasContent = keyTakeaways.content && 
                     Array.isArray(keyTakeaways.content) && 
                     keyTakeaways.content.length > 0 &&
                     keyTakeaways.content.some((node: any) => {
                       // Check if node has actual text content
                       if (node.nodeType === 'paragraph' || node.nodeType === 'heading-1' || 
                           node.nodeType === 'heading-2' || node.nodeType === 'heading-3') {
                         if (node.content && Array.isArray(node.content)) {
                           return node.content.some((c: any) => 
                             c.nodeType === 'text' && c.value && c.value.trim().length > 0
                           );
                         }
                       }
                       // Check for list items
                       if (node.nodeType === 'unordered-list' || node.nodeType === 'ordered-list') {
                         return node.content && Array.isArray(node.content) && node.content.length > 0;
                       }
                       return false;
                     });

  if (!hasContent) {
    return null; // Don't render if there's no actual content
  }

  // Custom render options for Rich Text (SSR-compatible)
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <li className="key-takeaways-item">
            {children}
          </li>
        );
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return (
          <ul className="key-takeaways-list">
            {children}
          </ul>
        );
      },
      [BLOCKS.OL_LIST]: (node: any, children: any) => {
        return (
          <ul className="key-takeaways-list">
            {children}
          </ul>
        );
      },
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        return (
          <li className="key-takeaways-item">
            {children}
          </li>
        );
      },
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return (
          <h1 className="key-takeaways-heading">{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <h2 className="key-takeaways-heading">{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <h3 className="key-takeaways-heading">{children}</h3>
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => {
        return <strong className="key-takeaways-bold">{text}</strong>;
      },
      [MARKS.ITALIC]: (text: any) => {
        return <em>{text}</em>;
      },
    },
  };

  // Add hyperlink renderer
  (renderOptions.renderNode as any)[INLINES.HYPERLINK] = (node: any, children: any) => {
    const url = node.data?.uri || '#';
    return (
      <SmartLink
        href={url}
        className="text-[#005CCC] underline hover:text-[#004aad] transition-colors"
      >
        {children}
      </SmartLink>
    );
  };

  return (
    <div className="key-takeaways-container">
      <h3 className="key-takeaways-title">
        Key Takeaways
      </h3>
      <div className="key-takeaways-content">
        {documentToReactComponents(keyTakeaways, renderOptions)}
      </div>
    </div>
  );
}
