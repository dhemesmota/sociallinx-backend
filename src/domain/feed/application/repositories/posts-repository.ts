import { PaginationParams } from '@/core/repositories/pagination-params';
import { Post } from '../../enterprise/entities/post';

export abstract class PostsRepository {
  abstract findById(id: string): Promise<Post | null>
  abstract findManyByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Post[]>

  abstract create(post: Post): Promise<void>
  abstract save(post: Post): Promise<void>
  abstract delete(post: Post): Promise<void>
  abstract findMany(params: PaginationParams): Promise<Post[]>
  abstract count(): Promise<number>
  abstract countPostsByStatusPerDay(
    from?: string,
    to?: string,
  ): Promise<
    Array<{
      date: string
      posts: { status: string; count: number }[]
    }>
  >
}
