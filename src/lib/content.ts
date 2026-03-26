import generatedPosts from '../content/generated/posts.json';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  excerpt: string;
  readingTime: number;
  body: string;
};

function compareDates(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export const posts: BlogPost[] = [...generatedPosts].sort(compareDates);

export const featuredPosts = posts.filter((post) => post.featured);
export const latestPosts = posts.slice(0, 3);
export const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort();

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(targetPost: BlogPost, limit = 3) {
  return posts
    .filter((post) => post.slug !== targetPost.slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => targetPost.tags.includes(tag)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return compareDates(a.post, b.post);
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}
