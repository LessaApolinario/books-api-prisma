import type { Author } from '@prisma/client'
import type { CreateAuthorRequest } from '../../types/CreateAuthorRequest'

interface AuthorUseCase {
  create(author: CreateAuthorRequest): Promise<boolean>
  update(author: Author): Promise<boolean>
  fetch(): Promise<Author[]>
  remove(id: string): Promise<boolean>
  findByName(name: string): Promise<Author | null>
  fetchByBookID(bookID: string): Promise<Author[]>
}

export default AuthorUseCase
