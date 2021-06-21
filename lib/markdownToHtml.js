import { language } from 'gray-matter';
import showdown from 'showdown';
import showdownKatex from 'showdown-katex';

showdown.setFlavor('github');

export default async function markdownToHtml(markdown) {
  let converter = new showdown.Converter({
    prefixHeaderId: "section-",
    ghCompatibleHeaderId: true,
    tasklists: true,
    tables: true,
    emoji: true,
    underline: true,
    strikethrough: true,
    openLinksInNewWindow: true,
    extensions: [
      {
        type: 'lang',
        regex: /\{\%\s*POST_URL\s*\%\}/g,
        replace: '/posts'
      },
      {
        type: 'output',
        regex: /<img(.*)>/g,
        replace: '<img loading="lazy" $1>'
      },
      showdownKatex({
        delimiters: [
          { left: "$", right: "$" },
        ],
      }),   
    ],
  });

  let html      = converter.makeHtml(markdown);
  return html;
}
