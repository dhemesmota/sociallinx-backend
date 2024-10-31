import { PaginationParams } from '@/core/repositories/pagination-params'
import { PostsRepository } from '@/domain/feed/application/repositories/posts-repository'
import { Post } from '@/domain/feed/enterprise/entities/post'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { PrismaPostMapper } from '../mappers/prisma-post-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByAuthorId(
    authorId: string,
    { page }: PaginationParams,
  ): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return posts.map(PrismaPostMapper.toDomain)
  }

  async findMany({ page }: PaginationParams): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return posts.map(PrismaPostMapper.toDomain)
  }

  count(): Promise<number> {
    return this.prisma.post.count()
  }

  async countPostsByStatusPerDay(from?: string, to?: string) {
    const startDate = from ? dayjs(from) : dayjs().subtract(7, 'day')
    const endDate = to ? dayjs(to) : dayjs()

    // Verificar se o intervalo não excede 7 dias
    if (endDate.diff(startDate, 'day') > 7) {
      throw new BadRequestException(
        'O intervalo das datas não pode ser superior a 7 dias.',
      )
    }

    // Consultar a contagem de postagens por status agrupadas por data
    const postCounts = await this.prisma.post.groupBy({
      by: ['status', 'createdAt'],
      _count: {
        status: true,
      },
      where: {
        createdAt: {
          gte: startDate.startOf('day').toDate(),
          lte: endDate.endOf('day').toDate(),
        },
      },
    })

    // Agrupar e formatar os resultados por data
    const result = postCounts.reduce(
      (acc, post) => {
        const dateKey = dayjs(post.createdAt).format('YYYY-MM-DD')

        // Verificar se a data já existe no acumulador
        let dateEntry = acc.find((entry) => entry.date === dateKey)
        if (!dateEntry) {
          dateEntry = { date: dateKey, posts: [] }
          acc.push(dateEntry)
        }

        // Adicionar a contagem para o status específico
        dateEntry.posts.push({
          status: post.status,
          count: post._count.status,
        })

        return acc
      },
      [] as { date: string; posts: { status: string; count: number }[] }[],
    )

    return result
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    })

    if (!post) {
      return null
    }

    return PrismaPostMapper.toDomain(post)
  }

  async create(post: Post): Promise<void> {
    const data = PrismaPostMapper.toPrisma(post)

    await this.prisma.post.create({
      data,
    })
  }

  async save(post: Post): Promise<void> {
    const data = PrismaPostMapper.toPrisma(post)

    await this.prisma.post.update({
      where: {
        id: post.id.toString(),
      },
      data,
    })
  }

  async delete(post: Post): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id: post.id.toString(),
      },
    })
  }
}
