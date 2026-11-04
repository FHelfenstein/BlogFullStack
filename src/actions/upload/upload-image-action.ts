'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionResult> {
  const isAuthenticated = await getLoginSessionForApi();

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos!' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido!' });
  }

  const uploadSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
  if (file.size > uploadSize) {
    const readableMaxSize = (uploadSize / 1024).toFixed(2);
    return makeResult({
      error: `Arquivo de imagem muito grande, Máx: ${readableMaxSize}KB.`,
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida!' });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makeResult({ url });
}
