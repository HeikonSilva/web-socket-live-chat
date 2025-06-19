import type { FastifyTypedInstance } from '../types'

export default function ApiStatus(app: FastifyTypedInstance) {
  app.ready((err) => {
    if (err) throw err

    app.io.on('connection', (socket: any) => {
      socket.on('status', () => {
        socket.emit('status', { status: 'online' })
      })
    })
  })
}
