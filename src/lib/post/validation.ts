import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';
// import { getErrorMessages } from '@/utils/get-zod-error-messages';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, 'Título deve ter no mínimo 10 caractres.')
    .max(120, 'Título deve ter no máximo 120 caracteres.'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo é obrigatório')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Autor precisa de um mínimo de 4 caracteres')
    .max(100, 'Nome do autor não deve ter mais que 100 caracteres'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto precisa de um mínimo de 3 caracteres')
    .max(200, 'Excerto não deve ter mais que 200 caracteres'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'URL da capa deve ser uma URL ou caminho para imagem',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

//PostCreateSchema: igual ao base por enquanto
export const PostCreateSchema = PostBaseSchema;

//PostUpdateSchema: pode incluir campos extras no futuro (ex:Id)
export const PostUpdateSchema = PostBaseSchema.extend({
  //id: z.uuid('ID Inválido'),
});

// const obj = {
//   $ACTION_REF_1: '',
//   '$ACTION_1:0':
//     '{"id":"60b94a37d6883a6f2a822bebf7ddbd50ed53b42a72","bound":"$@1"}',
//   '$ACTION_1:1':
//     '[{"formState":{"id":"99f8add4-7684-4c16-a316-616271db199e","slug":"rotina-matinal-de-pessoas-altamente-eficazes","title":"Rotina matinal de pessoas altamente eficazes","author":"Isabela Nunes","excerpt":"O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.","content":"O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.","published":false,"createdAt":"2026-04-08T00:24:38.616Z","coverImageUrl":"/images/bryen_8.png"},"errors":[]}]',
//   $ACTION_KEY: 'k1488883480',
//   id: '99f8add4-7684-4c16-a316-616271db199e',
//   slug: 'rotina-matinal-de-pessoas-altamente-eficazes',
//   author: 'Isabela Nunes',
//   title: '',
//   excerpt:
//     'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
//   content:
//     'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
//   file: {
//     size: 0,
//     type: 'application/octet-stream',
//     name: 'undefined',
//     lastModified: 1791926721300,
//   },
//   coverImageUrl: 'images/bryen_8.png',
//   published: 'on',
// };

// const result = PostCreateSchema.safeParse(obj);

// if (!result.success) {
//   const errors = getErrorMessages(z.treeifyError(result.error));

//   console.log(errors);
// }
