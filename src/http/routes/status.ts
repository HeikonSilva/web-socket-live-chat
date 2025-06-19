import { Type } from '@sinclair/typebox'
import type { FastifyTypedInstance } from '../types'

export default function ApiStatus(app: FastifyTypedInstance) {
  app.get(
    '/status',
    {
      schema: {
        description: 'Return the status of the API',
        response: {
          '200': Type.Object({
            status: Type.String(),
          }),
        },
      },
    },
    (req, res) => {
      res.status(200).send({ status: 'online' })
    }
  )
}
