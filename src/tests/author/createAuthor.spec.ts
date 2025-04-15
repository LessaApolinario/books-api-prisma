import { beforeAll, describe, expect, it } from 'vitest'
import type AuthorRepository from '../../interfaces/repositories/AuthorRepository'
import type AuthorUseCase from '../../interfaces/usecases/AuthorUseCase'
import InMemoryAuthorRepository from '../../repositories/in-memory/InMemoryAuthorRepository'
import AuthorService from '../../services/AuthorService'

let authorRepository: AuthorRepository
let sut: AuthorUseCase

describe('Create author tests', () => {
  beforeAll(() => {
    authorRepository = new InMemoryAuthorRepository()
    sut = new AuthorService(authorRepository)
  })

  it('should be able to create an author', async () => {
    const newAuthorPayload = {
      name: 'James',
    }

    const result = await sut.create(newAuthorPayload)
    expect(result).not.toBeNull()
  })

  it('should not be able to create an duplicated author', async () => {
    const newAuthorPayload = {
      name: 'Kyle',
    }

    await sut.create(newAuthorPayload)

    const result = await sut.create(newAuthorPayload)

    expect(result).toBeNull()
  })
})
