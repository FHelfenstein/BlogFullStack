'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validation';
import { PostModel } from '@/models/post-model';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
import { z } from 'zod';
import { v4 as uuidV4 } from 'uuid';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { postRepository } from '@/repositories/post';
import { verifyLoginSession } from '@/lib/login/manage-login';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  //TODO: verificar se o usuário está logado
  //const isAuthenticated = await requireLoginSessionOrRedirect();
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries()); // transforma os dados de formData para um objeto do javaScript
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getErrorMessages(z.treeifyError(zodParsedObj.error));

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
    published: true,
  };

  try {
    await postRepository.create(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: newPost,
        errors: [error.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`); // criando um searchParams , para que no formulário possamos monitorar essa mudança e exibir a mensagem de post criado com sucesso
}
