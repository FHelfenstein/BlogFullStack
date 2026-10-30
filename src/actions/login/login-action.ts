'use server';

import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
import { z } from 'zod';

type loginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: loginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login not allowed'],
    };
  }

  await asyncDelay(5000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  // validar
  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getErrorMessages(z.treeifyError(parsedFormData.error)),
    };
  }

  // fecth-Api
  const result = await apiRequest<{ accesToken: string }>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!result.success) {
    return {
      email: formEmail,
      errors: result.errors,
    };
  }

  console.log(result.data);

  // await createLoginSession(email);
  // redirect('/admin/post');

  return {
    email: formEmail,
    errors: ['Success'],
  };
}
