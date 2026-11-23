import MarkdownIt from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';

const READ_MORE = /---readmore---/g;

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
  highlight(code: string, lang: string): string {
    const language = lang && hljs.getLanguage(lang) ? lang : '';
    const highlighted = language
      ? hljs.highlight(code, { language, ignoreIllegals: true }).value
      : md.utils.escapeHtml(code);
    return `<pre class="hljs"><code>${highlighted}</code></pre>`;
  },
}).use(emoji);

const defaultLinkOpen =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') || '';
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

export function renderMarkdown(source: string | undefined | null): string {
  if (!source) {
    return '';
  }
  const html = md.render(source.replace(READ_MORE, ''));
  return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
}
