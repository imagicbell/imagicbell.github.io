import { language } from 'gray-matter';
import showdown from 'showdown';
import showdownKatex from 'showdown-katex';

export default async function markdownToHtml(markdown) {
  let converter = new showdown.Converter({
    prefixHeaderId: "section-",
    ghCompatibleHeaderId: true,
    tasklists: true,
    emoji: true,
    extensions: [
      {
        type: 'lang',
        regex: /\{\%\s*POST_URL\s*\%\}/g,
        replace: `${process.env.basePath}/posts`
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
