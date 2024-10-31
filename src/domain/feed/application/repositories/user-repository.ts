// eslint-disable-next-line prettier/prettier
import { User } from '../../enterprise/entities/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>

  abstract findById(id: string): Promise<User | null>

  abstract save(user: User): Promise<void>

  abstract create(user: User): Promise<void>
}
