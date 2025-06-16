import type { FastifyInstance } from 'fastify'

export default function Hello(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        description: 'Hello',
      },
    },
    () => {
      return { hello: 'world' }
    }
  )
}
