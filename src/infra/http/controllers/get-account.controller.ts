import { GetUserUseCase } from '@/domain/feed/application/use-cases/get-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Controller, Get, UnauthorizedException } from '@nestjs/common'
import { UserPresenter } from '../presenters/user-presenter'

@Controller('/account')
export class GetUserController {
  constructor(private getUser: GetUserUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const id = user.sub

    const result = await this.getUser.execute({
      id,
    })

    if (result.isLeft()) {
      throw new UnauthorizedException()
    }

    return UserPresenter.toHTTP(result.value.user)
  }
}
