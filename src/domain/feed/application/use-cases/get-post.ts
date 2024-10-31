import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'

interface GetPostUseCaseRequest {
  id: string
}

type GetPostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    post: Post
  }
>

@Injectable()
export class GetPostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute({
    id,
  }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
    const post = await this.postRepository.findById(id)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    return right({
      post,
    })
  }
}
