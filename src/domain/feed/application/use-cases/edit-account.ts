import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'
import { AccountEmailAlreadyExistsError } from './errors/account-email-already-exists-error'

interface EditAccountUseCaseRequest {
  userId: string
  name: string
  email: string
  password?: string
}

type EditAccountUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    account: User
  }
>

@Injectable()
export class EditAccountUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: EditAccountUseCaseRequest): Promise<EditAccountUseCaseResponse> {
    const findUser = await this.userRepository.findById(userId)

    if (!findUser) {
      return left(new ResourceNotFoundError())
    }

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail && userWithSameEmail?.id?.toString() !== userId) {
      return left(new AccountEmailAlreadyExistsError(email))
    }

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password)
      findUser.password = hashedPassword
    }

    findUser.email = email
    findUser.name = name

    await this.userRepository.save(findUser)

    return right({
      account: findUser,
    })
  }
}
