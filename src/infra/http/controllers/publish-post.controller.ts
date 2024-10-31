import { PublishPostUseCase } from '@/domain/feed/application/use-cases/publish-post'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/posts/:postId/publish')
export class PublishPostController {
  constructor(private publishPost: PublishPostUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('postId') postId: string,
  ) {
    const result = await this.publishPost.execute({
      postId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
