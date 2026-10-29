'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { asyncDelay } from '@/utils/async-delay';
import { getErrorMessages } from '@/utils/get-zod-error-messages';
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

  const formDataToObj = Object.fromEntries(formData.entries());
  console.log(formDataToObj);

  const zodParsedObj = CreateUserSchema.safeParse(formDataToObj);
  console.log(zodParsedObj);

  if (!zodParsedObj.success) {
    return {
      user: PublicUserSchema.parse(formDataToObj),
      errors: getErrorMessages(z.treeifyError(zodParsedObj.error)),
      success: false,
    };
  }

  // FETCH API

  return {
    user: state.user,
    errors: [],
    success: true,
  };
}
