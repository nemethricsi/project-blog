import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import { BLOG_TITLE } from '@/constants';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';

export async function generateMetadata({ params: { postSlug } }) {
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
