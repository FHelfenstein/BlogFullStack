import PostsListAdmin from '@/components/admin/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <PostsListAdmin />
    </Suspense>
  );
}
