'use client';

import clsx from 'clsx';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { CreateUserAction } from '@/actions/user/create-user-action';
import { PublicUserSchema } from '@/lib/user/schemas';
import { showMessage } from '@/adapters/showMessage';

export function CreateUserForm() {
  const initialState = {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  };
  const [state, action, isPending] = useActionState(
    CreateUserAction,
    initialState,
  );

  useEffect(() => {
    showMessage.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => showMessage.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />

        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
          required
        />

        <InputText
          type='password'
          name='password2'
          labelText='Confirmar Senha'
          placeholder='Sua senha novamente'
          disabled={isPending}
          required
        />

        <Button className='mt-4' type='submit' disabled={isPending}>
          <UserRoundIcon />
          {!isPending && 'Criar Conta'}
          {isPending && 'Criando...'}
        </Button>

        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
