'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUserFromApi } from '@/lib/user/api/get-user';
import { UpdatePasswordSchema } from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type UpdatePasswordActionState = {
  errors: string[];
  success: boolean;
};

export async function updatePasswordAction(
  state: UpdatePasswordActionState,
  formData: FormData,
): Promise<UpdatePasswordActionState> {
  const user = await getPublicUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdatePasswordSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      errors: getErrorMessages(z.treeifyError(parsedFormData.error)),
      success: false,
    };
  }

  const updatePasswordResponse = await authenticatedApiRequest(
    `/user/me/password`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!updatePasswordResponse.success) {
    return {
      errors: updatePasswordResponse.errors,
      success: false,
    };
  }

  await deleteLoginSession();
  redirect('/login?userChanged=1');
}
