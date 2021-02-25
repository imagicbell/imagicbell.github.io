import showdown from 'showdown'

export default async function markdownToHtml(markdown) {
  let converter = new showdown.Converter();
  let html      = converter.makeHtml(markdown);
  return html;
}
