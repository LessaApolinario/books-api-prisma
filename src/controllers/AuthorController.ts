import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import messages from '../errors/messages'
import type AuthorUseCase from '../interfaces/usecases/AuthorUseCase'
import type { CreateAuthorRequest } from '../types/CreateAuthorRequest'

class AuthorController {
  constructor(private readonly useCase: AuthorUseCase) {}

  async createAuthor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createAuthorSchema = z.object({
        name: z.string(),
      })
      const { data, success } = createAuthorSchema.safeParse(request.body)
      if (!success) {
        return reply.status(400).send({ message: 'Payload inválido' })
      }

      const { name } = data

      const foundAuthor = await this.useCase.findByName(name)
      if (foundAuthor !== null) {
        return reply
          .status(409)
          .send({ message: messages.authorAlreadyExistsMessage })
      }

      const newAuthor: CreateAuthorRequest = {
        name,
      }

      await this.useCase.create(newAuthor)
      return reply
        .status(201)
        .send({ message: messages.authorCreatedWithSuccessMessage })
    } catch (error) {
      return reply
        .status(500)
        .send({ message: messages.internalServerErrorMessage })
    }
  }
}

export default AuthorController
