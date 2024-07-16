import { marked } from './marked';

import './Markdown.css';

export interface MarkdownProps {
  content: string;
}

export const Markdown = ({
  content
}: MarkdownProps) => {
  const html = marked.parse(content);

  return (
    <article
      className="markdown-article"
      dangerouslySetInnerHTML={{
      __html: html
    }}/>
  );
};
