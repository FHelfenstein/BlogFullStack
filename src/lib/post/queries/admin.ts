import { PostModelFromApi } from '@/models/post-model';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findPostByIdAdmin = cache(async (id: string) => {
  return postRepository.findById(id);
});

export const findAllPostAdmin = cache(async () => {
  return postRepository.findAll();
});

// FETCH - API

// findPostByIdFromApiAdmin
export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id} `,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postResponse;
});

// findAllPostFromApiAdmin
export const findAllPostFromApiAdmin = cache(async () => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post/me/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    },
  );

  return postsResponse;
});
