import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = ''; // NÃO ESQUECER DE APAGAR SUA SENHA AQUI , ANTES DE ENVIAR PARA O GIT
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log('Senha Hash base64: ', hashDaSuaSenhaEmBase64);
})();
