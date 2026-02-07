import type { ReactElement } from 'react';

export type SectionCardTone = 'default' | 'success';

export interface SectionCardProps {
  title: string;
  body: string;
  href: string;
  tone?: SectionCardTone;
}

export function SectionCard({ title, body, href, tone = 'default' }: SectionCardProps): ReactElement {
  const toneClass = tone === 'success' ? 'ui-card--success' : 'ui-card--default';

  return (
    <article className={`ui-card ${toneClass}`}>
      <h2>{title}</h2>
      <p>{body}</p>
      <a href={href}>View details</a>
    </article>
  );
}
