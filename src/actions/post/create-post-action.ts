'use server';

import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/post/schemas';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries()); // transforma os dados de formData para um objeto do javaScript

  // console.log('DADOS DO FORMULÁRIO:', {
  //   coverImageUrl: formData.get('coverImageUrl'),
  //   todosOsCampos: [...formData.keys()],
  // });

  const zodParsedObj = CreatePostForApiSchema.safeParse(formDataToObj);

  // if (zodParsedObj.success) {
  //   console.log('DADOS VALIDADOS PELO ZOD:', {
  //     coverImageUrl: zodParsedObj.data.coverImageUrl,
  //   });
  // }

  if (!isAuthenticated) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getErrorMessages(z.treeifyError(zodParsedObj.error));

    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors,
    };
  }

  const newPost = zodParsedObj.data;

  // console.log('ENVIANDO PARA API:', {
  //   coverImageUrl: newPost.coverImageUrl,
  // });

  const createPostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    '/post/me',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!createPostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;

  revalidateTag('posts');
  redirect(`/admin/post/${createdPost.id}?created=1`); // criando um searchParams , para que no formulário possamos monitorar essa mudança e exibir a mensagem de post criado com sucesso
}
