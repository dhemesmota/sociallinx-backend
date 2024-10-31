import { ReprovePostUseCase } from '@/domain/feed/application/use-cases/reprove-post'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
    BadRequestException,
    Controller,
    HttpCode,
    Param,
    Patch,
} from '@nestjs/common'

@Controller('/posts/:postId/reprove')
export class ReprovePostController {
  constructor(private reprovePost: ReprovePostUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('postId') postId: string,
  ) {
    const result = await this.reprovePost.execute({
      postId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
