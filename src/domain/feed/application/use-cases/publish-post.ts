import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Post } from '@/domain/feed/enterprise/entities/post'
import { Injectable } from '@nestjs/common'
import { PostStatus } from '@prisma/client'
import { PostsRepository } from '../repositories/posts-repository'

interface PublishPostUseCaseRequest {
  authorId: string
  postId: string
}

type PublishPostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    post: Post
  }
>

@Injectable()
export class PublishPostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute({
    authorId,
    postId,
  }: PublishPostUseCaseRequest): Promise<PublishPostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    post.status = PostStatus.PUBLISHED
    post.authorId = new UniqueEntityID(authorId)

    await this.postRepository.save(post)

    return right({
      post,
    })
  }
}
