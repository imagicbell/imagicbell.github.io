import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import unified from 'unified';
import markdownParse from 'remark-parse';
import { BLOG_PAGINATE, ABSTRACT_LENGTH_PREVIEW, ABSTRACT_LENGTH_CN_PREVIEW } from './constants';


const postsDirectory = join(process.cwd(), '_posts')

function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
           .filter(fileName => !fs.lstatSync(join(postsDirectory, fileName)).isDirectory() 
                                && /^\d{4}-\d{1,2}-\d{1,2}/.test(fileName) 
                                && /\.(md|markdown)$/.test(fileName)) 
           .map(fileName => {
             //rename .markdown to .md
             if (/\.markdown$/.test(fileName)) {
               let newFileName = fileName.replace(/\.markdown$/, '.md');
               fs.renameSync(join(postsDirectory, fileName), join(postsDirectory, newFileName));
               return newFileName;
             }
             return fileName;
           });
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    } else if (field === 'locale') {
      items[field] = (data[field] || 'en').toLowerCase();
    } else if (field === 'content') {
      items[field] = content
    } else if (field === 'categories') {
      items[field] = data[field].split(/[\s,]/).filter(el => el !== '');
    } else if (field === 'readTime') {
      items[field] = calcMarkdownReadTime(content, (data.locale || 'en').toLowerCase());
    } else if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostForPreview(slug) {
  let post = getPostBySlug(slug, [
    'slug',
    'title',
    'date',
    'locale',
    'ogImage',
    'categories',
    'abstract',
    'content',
    'readTime'
  ]);
  if (post.abstract === undefined) {
    post.abstract = extractPostAbstract(post, { en: ABSTRACT_LENGTH_PREVIEW, cn: ABSTRACT_LENGTH_CN_PREVIEW });
  }
  delete post.content;
  return post;  
} 

export function extractPostAbstract(post, length) {
  let tree = unified().use(markdownParse).parse(post.content);
  let p = tree.children.find(n => n.type === 'paragraph');
  let text = '';
  for (let i = 0; i < p.children.length; i++) {
    let node = p.children[i];
    while (node.children && node.children.length === 1) {
      node = node.children[0];
    }
    if (node.children && node.children.length > 1) {
      break;
    }
    if (node.type === 'text' || node.type === 'inlineCode') {
      text += node.value;
    }
  }

  if (post.locale === 'cn') {
    text = text.slice(0, length.cn);
  } else {
    text = text.split(' ').slice(0, length.en).join(' ');
  }
  return `<p>${text}...</p>`;
}

export function countMarkdownText(content, locale) {
  let tree = unified().use(markdownParse).parse(content);
  let count = 0;
  let traverse = node => {
    if (node.value) {
      if (locale === 'cn') {
        count += node.value.split(/[\s，。；（）！？]/)
                           .reduce((acc, cur) => acc + cur.length, 0);
      } else {
        count += node.value.split(/[\s,;\.()!?]/).filter(el => el !== '').length;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }
  traverse(tree);
  return count;
}

export function calcMarkdownReadTime(content, locale) {
  return Math.floor(countMarkdownText(content, locale) / (locale === 'cn' ? 500 : 200));
}