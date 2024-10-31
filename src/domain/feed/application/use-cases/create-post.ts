import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Post } from '@/domain/feed/enterprise/entities/post'
import { Injectable } from '@nestjs/common'
import { PostsRepository } from '../repositories/posts-repository'

interface CreatePostUseCaseRequest {
  content?: string
  title?: string
  authorId?: string
}

type CreatePostUseCaseResponse = Either<
  null,
  {
    post: Post
  }
>

@Injectable()
export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    title,
    content,
    authorId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const post = Post.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.postsRepository.create(post)

    return right({
      post,
    })
  }
}
