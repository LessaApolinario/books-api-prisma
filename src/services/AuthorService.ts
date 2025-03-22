import type { Author } from '@prisma/client'
import type AuthorRepository from '../interfaces/repositories/AuthorRepository'
import AuthorUseCase from '../interfaces/usecases/AuthorUseCase'
import type { CreateAuthorRequest } from '../types/CreateAuthorRequest'

class AuthorService implements AuthorUseCase {
  constructor(private readonly repository: AuthorRepository) {}

  create(author: CreateAuthorRequest): Promise<boolean> {
    return this.repository.create(author)
  }

  update(author: Author): Promise<boolean> {
    return this.repository.update(author)
  }

  fetch(): Promise<Author[]> {
    return this.repository.fetch()
  }

  remove(id: string): Promise<boolean> {
    return this.repository.remove(id)
  }

  findByName(name: string): Promise<Author | null> {
    return this.repository.findByName(name)
  }

  fetchByBookID(bookID: string): Promise<Author[]> {
    return this.repository.fetchByBookID(bookID)
  }
}

export default AuthorService
