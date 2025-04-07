import type { FastifyInstance } from 'fastify'
import { authorRoutes } from './author'

export async function appRoutes(app: FastifyInstance) {
  app.register(authorRoutes)
}
