import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Post } from '@/domain/feed/enterprise/entities/post'
import { PostStatus, Prisma, Post as PrismaPost } from '@prisma/client'

export class PrismaPostMapper {
  static toDomain(raw: PrismaPost): Post {
    return Post.create(
      {
        content: raw?.content,
        authorId: raw.authorId ? new UniqueEntityID(raw.authorId) : null,
        title: raw.title,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(post: Post): Prisma.PostUncheckedCreateInput {
    return {
      id: post.id.toString(),
      authorId: post?.authorId?.toString(),
      content: post.content,
      title: post.title,
      status: post.status as PostStatus,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}
