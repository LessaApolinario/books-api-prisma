import type { Author } from '@prisma/client'
import type {
  CreateAuthorRequest,
  UpdateAuthorRequest,
} from '../../types/request/author'

interface AuthorUseCase {
  create(author: CreateAuthorRequest): Promise<boolean>
  update(author: UpdateAuthorRequest): Promise<boolean>
  fetch(): Promise<Author[]>
  remove(id: string): Promise<boolean>
  findById(id: string): Promise<Author | null>
  findByName(name: string): Promise<Author | null>
  fetchByBookID(bookID: string): Promise<Author[]>
}

export default AuthorUseCase
