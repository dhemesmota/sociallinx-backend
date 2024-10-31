import { CreatePostUseCase } from '@/domain/feed/application/use-cases/create-post'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreatePostBodySchema = z.infer<typeof createPostBodySchema>

@Controller('/posts')
export class CreatePostController {
  constructor(private createPost: CreatePostUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createPostBodySchema))
    body: CreatePostBodySchema,
  ) {
    console.log(body)
    const { title, content } = body

    const result = await this.createPost.execute({
      title,
      content,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
