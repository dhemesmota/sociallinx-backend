import { UseCaseError } from '@/core/errors/use-case-error'

export class AccountEmailAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Conta de e-mail "${identifier}" já existe.`)
  }
}
