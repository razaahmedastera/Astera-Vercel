import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Renders next/link for internal routes (starting with /) and
 * a standard <a> for external URLs. Automatically sets target/rel for external.
 */
export default function SmartLink({ href, children, target, rel, ...rest }: SmartLinkProps) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target || '_blank'}
      rel={rel || 'noopener noreferrer'}
      {...rest}
    >
      {children}
    </a>
  );
}
