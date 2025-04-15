import { beforeAll, describe, expect, it } from 'vitest'
import type AuthorRepository from '../../interfaces/repositories/AuthorRepository'
import type AuthorUseCase from '../../interfaces/usecases/AuthorUseCase'
import InMemoryAuthorRepository from '../../repositories/in-memory/InMemoryAuthorRepository'
import AuthorService from '../../services/AuthorService'

let authorRepository: AuthorRepository
let sut: AuthorUseCase

describe('Update author tests', () => {
  beforeAll(() => {
    authorRepository = new InMemoryAuthorRepository()
    sut = new AuthorService(authorRepository)
  })

  it('should be able to update an author', async () => {
    const newAuthor = {
      name: 'Juca',
    }

    const authorReturn = await sut.create(newAuthor)

    const updatedAuthor = {
      id: authorReturn?.id ?? '',
      name: 'Novo nome',
    }

    const result = await sut.update(updatedAuthor)
    expect(result).toBeTruthy()
  })
})
