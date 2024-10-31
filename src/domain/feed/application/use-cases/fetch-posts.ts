import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'

interface FetchPostsUseCaseRequest {
  page: number
}

type FetchPostsUseCaseResponse = Either<
  null,
  {
    posts: Post[]
    count: number
  }
>

@Injectable()
export class FetchPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    page,
  }: FetchPostsUseCaseRequest): Promise<FetchPostsUseCaseResponse> {
    const posts = await this.postsRepository.findMany({
      page,
    })

    const count = await this.postsRepository.count()

    return right({
      posts,
      count,
    })
  }
}
