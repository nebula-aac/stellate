import { ReactElement, JSXElementConstructor } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { textBlock } from './notion/renderers';

process.env['NODE' + '_ENV'] = 'production'
process.env.USE_CACHE = 'true'

const NOW = new Date().toJSON()

function mapToAuthor(author: { full_name: string; }) {
  return `<author><name>${author.full_name}</name></author>`
}

function decode(string: string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function mapToEntry(post: {
  link: any;
  title: string;
  date: string | number | Date;
  preview: any;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  authors: any;
}) {
  return `
      <entry>
        <id>${post.link}</id>
        <title>${decode(post.title)}</title>
        <link href="${post.link}"/>
        <updated>${new Date(post.date).toJSON()}</updated>
        <content type="xhtml">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${renderToStaticMarkup(
    post.preview
      ? (post.preview || []).map((block: any, idx: string) =>
        textBlock(block, false, post.title + idx)
      )
      : post.content
  )}
            <p class="more">
              <a href="${post.link}">Read more</a>
            </p>
          </div>
        </content>
        ${(post.authors || []).map(mapToAuthor).join('\n      ')}
      </entry>`
}