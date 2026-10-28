import { IPostRepository } from './Ipost-repository';
import { DrizzlePostRepository } from './drizzle-post-repository';

//export const postRepository: IPostRepository = new JsonPostRepository();  // buscando os dados do arquivo seed (JSON)
export const postRepository: IPostRepository = new DrizzlePostRepository(); // buscando os dados no banco de dados sqlite3
