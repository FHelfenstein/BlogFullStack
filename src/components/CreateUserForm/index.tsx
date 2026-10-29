'use client';

import clsx from 'clsx';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';

export function CreateUserForm() {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={''} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='username'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={false}
          defaultValue={''}
          required
        />

        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={false}
          defaultValue={''}
          required
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={false}
          required
        />

        <InputText
          type='password'
          name='password2'
          labelText='Confirmar Senha'
          placeholder='Sua senha novamente'
          disabled={false}
          required
        />

        <Button className='mt-4' type='submit' disabled={false}>
          <UserRoundIcon />
          Criar Conta
        </Button>

        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
