import { PaginationParams } from '@/core/repositories/pagination-params'
import { UserRepository } from '@/domain/feed/application/repositories/user-repository'
import { User } from '@/domain/feed/enterprise/entities/user'

export class InMemoryUsersRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)
    return user || null
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id === user.id)
    if (index !== -1) {
      this.items[index] = user
    } else {
      this.items.push(user)
    }
  }

  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findMany({ page }: PaginationParams) {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async create(user: User) {
    this.items.push(user)
  }

  async count() {
    return this.items.length
  }
}
