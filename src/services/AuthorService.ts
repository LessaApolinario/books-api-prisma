import type { Author } from '@prisma/client'
import type AuthorRepository from '../interfaces/repositories/AuthorRepository'
import AuthorUseCase from '../interfaces/usecases/AuthorUseCase'
import type {
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '../types/request/author'

class AuthorService implements AuthorUseCase {
  constructor(private readonly repository: AuthorRepository) {}

  create(author: CreateAuthorRequest): Promise<Author | null> {
    return this.repository.create(author)
  }

  update(author: UpdateAuthorRequest): Promise<boolean> {
    return this.repository.update(author)
  }

  fetch(): Promise<Author[]> {
    return this.repository.fetch()
  }

  remove(id: string): Promise<boolean> {
    return this.repository.remove(id)
  }

  findById(id: string): Promise<Author | null> {
    return this.repository.findById(id)
  }

  findByName(name: string): Promise<Author | null> {
    return this.repository.findByName(name)
  }

  fetchByBookID(bookID: string): Promise<Author[]> {
    return this.repository.fetchByBookID(bookID)
  }
}

export default AuthorService
