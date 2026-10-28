import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from './';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postsTable); // ISSO AQUI TOMAR CUIDADO , LIMPA TODA MINHA BASE DE DADOS
    await drizzleDb.insert(postsTable).values(posts);

    console.log();
    console.log(`${posts.length} posts foram salvos na base de dados.`);
    console.log();
  } catch (error) {
    console.log();
    console.log('Ocorreu um erro...');
    console.log();
    console.log(error);
    console.log();
  }
})();
