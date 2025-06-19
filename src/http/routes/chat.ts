import type { FastifyTypedInstance } from '../types'

const users = []

export default function ApiStatus(app: FastifyTypedInstance) {
  app.ready((err) => {
    if (err) throw err

    app.io.on('connection', (socket: any) => {
      socket.on('join', (username: string) => {
        users[socket.id] = username
        app.io.emit('online-users', Object.values(users))
      })

      socket.on('disconnect', () => {
        delete users[socket.id]
        app.io.emit('online-users', Object.values(users))
      })

      socket.on('message', (data: any) => {
        app.io.emit('chat', data)
      })
    })
  })
}
