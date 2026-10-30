import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(6, 'Senha precisa ter um mínimo de 6 caracteres'),
});
