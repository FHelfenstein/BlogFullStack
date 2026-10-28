import { PostModel } from '@/models/post-model';
import { IPostRepository } from './Ipost-repository';
import { resolve } from 'node:path';
import { readFile, writeFile } from 'fs/promises';
import { asyncDelay } from '@/utils/async-delay';

/**Bloco de código que monta o caminho absolutO para leitura de arquivos seed json */
const ROOT_DIR = process.cwd(); // retorna o caminho raiz da aplicação
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);
export class JsonPostRepository implements IPostRepository {
  async findAll(): Promise<PostModel[]> {
    await this.SimulateWait();

    const posts = await this.readFromDisk();
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.SimulateWait();

    const posts = await this.readFromDisk();
    return posts.filter(post => post.published == true);
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error(`Post não encontrado com ID ${id}`);

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error(`Post não encontrado com slug ${slug}`);
    return post;
  }

  // Mutation
  // CREATE
  async create(post: PostModel): Promise<PostModel> {
    const posts = await this.findAll();

    if (!post.id || !post.slug) {
      throw new Error('Post sem ID ou Slug');
    }

    const idOrSlugExist = posts.find(
      savePost => savePost.id === post.id || savePost.slug === post.slug,
    );

    if (idOrSlugExist) {
      throw new Error('ID ou Slug devemn ser únicos');
    }

    posts.push(post);
    await this.writeFromDisk(posts);
    return post;
  }

  // DELETE
  async delete(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }
    const post = posts[postIndex];
    posts.splice(postIndex, 1);
    await this.writeFromDisk(posts);

    return post;
  }

  // UPDATE
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }
    const oldPost = posts[postIndex];

    const updatePost = {
      ...oldPost,
      ...newPostData,
      updateAt: new Date().toISOString(),
    };
    posts[postIndex] = updatePost;
    await this.writeFromDisk(posts);
    return updatePost;
  }

  // função que le o arquivo JSON , faz o parse e retorna um array de POSTS
  private async readFromDisk(): Promise<PostModel[]> {
    const parsedJson = JSON.parse(
      await readFile(JSON_POSTS_FILE_PATH, 'utf-8'),
    );
    const { posts } = parsedJson;
    return posts;
  }

  private async SimulateWait() {
    await asyncDelay(Number(process.env.SIMULATE_WAIT_IN_MS) || 0, true);
    // if (SIMULATE_WAIT_IN_MS <= 0) return;
    // await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async writeFromDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify({ posts }, null, 2);
    await writeFile(JSON_POSTS_FILE_PATH, jsonToString, 'utf-8');
  }
}
