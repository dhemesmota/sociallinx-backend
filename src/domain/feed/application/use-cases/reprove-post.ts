import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Post } from '@/domain/feed/enterprise/entities/post'
import { Injectable } from '@nestjs/common'
import { PostStatus } from '@prisma/client'
import { PostsRepository } from '../repositories/posts-repository'

interface ReprovePostUseCaseRequest {
  authorId: string
  postId: string
}

type ReprovePostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    post: Post
  }
>

@Injectable()
export class ReprovePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute({
    authorId,
    postId,
  }: ReprovePostUseCaseRequest): Promise<ReprovePostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    post.status = PostStatus.REPROVED
    post.authorId = new UniqueEntityID(authorId)

    await this.postRepository.save(post)

    return right({
      post,
    })
  }
}
