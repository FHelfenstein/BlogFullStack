'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function CreateUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos.'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getErrorMessages(z.treeifyError(parsedFormData.error)),
      success: false,
    };
  }

  // FETCH API
  const result = await apiRequest<PublicUserDto>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!result.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: result.errors,
      success: result.success,
    };
  }

  redirect('/login?created=1');
}
