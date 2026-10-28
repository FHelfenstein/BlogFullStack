import { PostModel } from '@/models/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    author: post?.author || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    published: post?.published || false,
    createdAt: post?.createdAt || '',
    coverImageUrl: post?.coverImageUrl || '',
  };
};

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
