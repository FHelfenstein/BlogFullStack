import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';

// O COMANDO slice utilizado em conjunto com o map avança uma posição no array ,para que o postFeatured não seja repetido dentro do postsList

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 1) return null;

  return (
    <section className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts &&
        posts.slice(1).map(post => {
          const postLink = `/post/${post.slug}`;

          return (
            <div className='flex flex-col gap-4 group' key={post.id}>
              <PostCoverImage
                linkProps={{
                  href: postLink,
                }}
                imageProps={{
                  src: post.coverImageUrl,
                  width: 1200,
                  height: 720,
                  alt: post.title,
                }}
              />

              <PostSummary
                postHeading='h2'
                postLink={postLink}
                createdAt={post.createdAt}
                title={post.title}
                excerpt={post.excerpt}
              />
            </div>
          );
        })}
    </section>
  );
}
