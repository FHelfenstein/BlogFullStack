'use client';

import { loginAction } from '@/actions/login/login-action';
import { showMessage } from '@/adapters/showMessage';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      showMessage.dismiss();
      showMessage.error(state.error);
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
          name='username'
          labelText='Usuário'
          placeholder='Seu usuário'
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
        />

        <Button className='mt-4' type='submit' disabled={isPending}>
          <LogInIcon />
          Entrar
        </Button>

        {!!state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  );
}
