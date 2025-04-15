import type { Author } from '@prisma/client'
import type AuthorRepository from '../../interfaces/repositories/AuthorRepository'
import type {
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '../../types/request/author'
import { generateRandomUUID } from '../../utils'

class InMemoryAuthorRepository implements AuthorRepository {
  authors: Author[] = []

  async create(author: CreateAuthorRequest): Promise<Author | null> {
    const foundAuthor = await this.findByName(author.name)

    if (foundAuthor !== null) {
      return null
    }

    const newAuthor: Author = {
      id: generateRandomUUID(),
      name: author.name,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.authors.push(newAuthor)

    return newAuthor
  }

  async update(author: UpdateAuthorRequest): Promise<boolean> {
    const foundAuthor = await this.findById(author.id)
    if (!foundAuthor) {
      return false
    }

    const foundAuthorIndex = this.authors.findIndex((item) => {
      return item.id === author.id
    })

    console.log('before: ', this.authors)
    const cloneAuthors = this.authors
    cloneAuthors[foundAuthorIndex] = foundAuthor
    this.authors = cloneAuthors
    console.log('after: ', this.authors)

    return true
  }

  fetch(): Promise<Author[]> {
    throw new Error('Method not implemented.')
  }

  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Author | null> {
    return await Promise.resolve(
      this.authors.find((author) => {
        return author.id === id
      }) ?? null
    )
  }

  async findByName(name: string): Promise<Author | null> {
    return await Promise.resolve(
      this.authors.find((author) => {
        return author.name === name
      }) ?? null
    )
  }

  fetchByBookID(bookID: string): Promise<Author[]> {
    throw new Error('Method not implemented.')
  }
}

export default InMemoryAuthorRepository
