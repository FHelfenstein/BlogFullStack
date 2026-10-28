'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionResult> {
  // TODO: Verificar se o usuário está logado
  const isAuthenticated = await verifyLoginSession();

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

  const imageExtension = extname(file.name); // pega a extensão do arquivo
  const imageName = `${Date.now()}${imageExtension}`; // monta o nome do arquivo + extensão

  const uploadDir = process.env.IMAGE_UPLOADER_DIRECTORY || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);
  await mkdir(uploadFullPath, { recursive: true }); // cria o diretório de acordo com o caminho completo fornecido

  const fullPathAbsolute = resolve(uploadFullPath, imageName); // monta o caminho absoluto com o nome do arquivo
  const bytes = await file.arrayBuffer(); // pega o array de bytes
  const buffer = Buffer.from(bytes); // transforma o array de bytes em buffer

  await writeFile(fullPathAbsolute, buffer); // salva o arquivo

  const imageServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imageServerUrl}/${imageName}`; // monta a url de retorno para visualizar a imagem

  return makeResult({ url });
}
