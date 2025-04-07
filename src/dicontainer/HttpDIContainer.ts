import type AuthorUseCase from '../interfaces/usecases/AuthorUseCase'
import PrismaPostgresAuthorRepository from '../repositories/postgres/PrismaPostgresAuthorRepository'
import AuthorService from '../services/AuthorService'

class HttpDIContainer {
  static getAuthorUseCase(): AuthorUseCase {
    return new AuthorService(new PrismaPostgresAuthorRepository())
  }
}

export default HttpDIContainer
