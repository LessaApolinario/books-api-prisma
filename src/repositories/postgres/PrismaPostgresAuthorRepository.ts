import type { Author } from '@prisma/client'
import prismaClient from '../../config/database'
import AuthorRepository from '../../interfaces/repositories/AuthorRepository'
import type {
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '../../types/request/author'

class PrismaPostgresAuthorRepository implements AuthorRepository {
  async create(author: CreateAuthorRequest): Promise<Author | null> {
    return await prismaClient.author.create({
      data: {
        name: author.name,
      },
    })
  }

  async update(author: UpdateAuthorRequest): Promise<boolean> {
    const { id } = await prismaClient.author.update({
      data: {
        name: author.name,
        updated_at: new Date(),
      },
      where: {
        id: author.id,
      },
    })

    return !!id.length
  }

  async fetch(): Promise<Author[]> {
    return await prismaClient.author.findMany()
  }

  async remove(id: string): Promise<boolean> {
    const deleteResult = await prismaClient.author.delete({
      where: {
        id,
      },
    })

    return !!deleteResult.id.length
  }

  async findById(id: string): Promise<Author | null> {
    return await prismaClient.author.findFirst({
      where: {
        id,
      },
    })
  }

  async findByName(name: string): Promise<Author | null> {
    return await prismaClient.author.findFirst({
      where: {
        name,
      },
    })
  }

  async fetchByBookID(bookID: string): Promise<Author[]> {
    return await prismaClient.author.findMany({
      where: {
        books: {
          some: {
            id: bookID,
          },
        },
      },
    })
  }
}

export default PrismaPostgresAuthorRepository
