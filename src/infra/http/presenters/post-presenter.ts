import { Post } from '@/domain/feed/enterprise/entities/post'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      id: post.id.toString(),
      content: post.content,
      authorId: post.authorId?.toString(),
      title: post.title,
      status: post.status?.toLowerCase(),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}
