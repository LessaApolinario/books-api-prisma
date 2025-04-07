import type { FastifyInstance } from 'fastify'
import HttpDIContainer from '../../dicontainer/HttpDIContainer'
import AuthorController from '../../controllers/AuthorController'

export async function authorRoutes(app: FastifyInstance) {
  const useCase = HttpDIContainer.getAuthorUseCase()
  const controller = new AuthorController(useCase)

  app.post('/author/create', controller.createAuthor.bind(controller))
  app.put('/author/update', controller.updateAuthor.bind(controller))
}
