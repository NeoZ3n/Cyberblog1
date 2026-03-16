import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { openGraph } from 'spectre:globals';

export async function GET(context) {
  const posts = await getCollection('blog', (post) => !post.data.draft);

  return rss({
    title: openGraph.blog.title || 'Blog',
    description: openGraph.blog.description || 'Latest blog posts',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}