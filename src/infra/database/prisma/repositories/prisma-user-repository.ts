import { UserRepository } from '@/domain/feed/application/repositories/user-repository'
import { User } from '@/domain/feed/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        id: user.id.toString(),
      },
      update: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      create: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  }
}
