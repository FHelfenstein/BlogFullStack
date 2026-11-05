import { UpdatePasswordForm } from '@/components/admin/UpdateUserPassword';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alterar Senha',
};

export default async function AdminUserPasswordPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
