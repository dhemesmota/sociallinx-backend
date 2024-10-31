import { EditAccountUseCase } from '@/domain/feed/application/use-cases/edit-account'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

const editAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)

type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

@Controller('/account')
export class EditAccountController {
  constructor(private editAccount: EditAccountUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, email, password } = body
    const userId = user.sub

    const result = await this.editAccount.execute({
      userId,
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
