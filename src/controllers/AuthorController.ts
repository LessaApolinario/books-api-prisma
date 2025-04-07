import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import messages from '../errors/messages'
import type AuthorUseCase from '../interfaces/usecases/AuthorUseCase'

class AuthorController {
  constructor(private readonly useCase: AuthorUseCase) {}

  async createAuthor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createAuthorSchema = z.object({
        name: z.string(),
      })
      const { data, success } = createAuthorSchema.safeParse(request.body)
      if (!success) {
        return reply
          .status(400)
          .send({ message: messages.invalidPayloadMessage })
      }

      const foundAuthor = await this.useCase.findByName(data.name)
      if (foundAuthor !== null) {
        return reply
          .status(409)
          .send({ message: messages.authorAlreadyExistsMessage })
      }

      type CreateAuthorPayload = z.infer<typeof createAuthorSchema>

      const newAuthor: CreateAuthorPayload = {
        name: data.name,
      }

      await this.useCase.create(newAuthor)
      return reply
        .status(201)
        .send({ message: messages.authorCreatedWithSuccessMessage })
    } catch (error) {
      console.error(error)
      return reply
        .status(500)
        .send({ message: messages.internalServerErrorMessage })
    }
  }

  async updateAuthor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const updateAuthorSchema = z.object({
        id: z.string(),
        name: z.string(),
      })
      const { data, success } = updateAuthorSchema.safeParse(request.body)
      if (!success) {
        return reply
          .status(400)
          .send({ message: messages.invalidPayloadMessage })
      }

      const author = await this.useCase.findById(data.id)
      if (!author) {
        return reply
          .status(404)
          .send({ message: messages.authorNotFoundMessage })
      }

      type UpdateUserPayload = z.infer<typeof updateAuthorSchema>

      const updatedAuthor: UpdateUserPayload = {
        id: data.id,
        name: data.name,
      }

      await this.useCase.update(updatedAuthor)
      return reply
        .status(204)
        .send({ message: messages.authorUpdatedWithSuccessMessage })
    } catch (error) {
      console.error(error)
      return reply
        .status(500)
        .send({ message: messages.internalServerErrorMessage })
    }
  }

  async fetchAuthors(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authors = await this.useCase.fetch()
      return reply.status(200).send(authors)
    } catch (error) {
      console.error(error)
      return reply
        .status(500)
        .send({ message: messages.internalServerErrorMessage })
    }
  }

  async removeAuthor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const removeAuthorSchema = z.object({
        id: z.string(),
      })
      const { data, success } = removeAuthorSchema.safeParse(request.params)
      if (!success) {
        if (!success) {
          return reply
            .status(400)
            .send({ message: messages.invalidPayloadMessage })
        }
      }

      const author = await this.useCase.findById(data.id)
      if (!author) {
        return reply
          .status(404)
          .send({ message: messages.authorNotFoundMessage })
      }

      await this.useCase.remove(data.id)
      return reply
        .status(204)
        .send({ message: messages.authorRemovedWithSuccess })
    } catch (error) {
      console.error(error)
      return reply
        .status(500)
        .send({ message: messages.internalServerErrorMessage })
    }
  }
}

export default AuthorController
