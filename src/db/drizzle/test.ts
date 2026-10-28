import { eq } from 'drizzle-orm';
import { drizzleDb } from './';
import { postsTable } from './schemas';

/**Teste para listagem de posts */
// (async () => {
//   const posts = await drizzleDb.select().from(postsTable);

//   //console.log(posts);
//   console.log();
//   console.log('Listagem de posts');
//   posts.forEach(post => {
//     console.log(post.title);
//   });
// })();

/**Teste para atualização de registro de posts no banco de dados */
(async () => {
  await drizzleDb
    .update(postsTable)
    .set({
      published: false,
    })
    .where(eq(postsTable.slug, 'rotina-matinal-de-pessoas-altamente-eficazes'));
})();
