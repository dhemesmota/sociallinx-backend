import { FetchPostsUseCase } from '@/domain/feed/application/use-cases/fetch-posts'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { PostPresenter } from '../presenters/post-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/posts')
export class FetchPostsController {
  constructor(private fetchPosts: FetchPostsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchPosts.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const posts = result.value.posts
    const totalCount = result.value.count
    const perPage = 20
    const pageIndex = page - 1

    return {
      posts: posts.map(PostPresenter.toHTTP),
      meta: {
        totalCount,
        perPage,
        pageIndex,
      },
    }
  }
}
