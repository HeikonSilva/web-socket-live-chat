import type { FastifyTypedInstance } from '../types'

interface Message {
  id: number
  userId?: string
  username?: string
  message: string
  timestamp: Date
  type: 'message'
}

interface User {
  id: string
  username: string
}

const users: Record<string, User> = {}
const messages: Message[] = []
let messageId = 0

export default function Chat(app: FastifyTypedInstance) {
  app.ready((err) => {
    if (err) throw err

    app.io.on('connection', (socket: any) => {
      // Usuário entra no chat
      socket.on('join', (username: string) => {
        users[socket.id] = { id: socket.id, username }

        // Atualiza lista de usuários online para todos
        app.io.emit('online-users', Object.values(users))
        // Envia histórico ao novo usuário
        socket.emit('chat-history', messages)
      })

      // Usuário desconectou
      socket.on('disconnect', () => {
        delete users[socket.id]
        app.io.emit('online-users', Object.values(users))
      })

      // Solicitação manual de usuários online
      socket.on('online-users', () => {
        socket.emit('online-users', Object.values(users))
      })

      // Nova mensagem enviada por um usuário
      socket.on('message', (data: string) => {
        const user = users[socket.id] || { id: 'unknown', username: 'Unknown' }
        const message: Message = {
          id: messageId++,
          userId: user.id,
          username: user.username,
          message: data,
          timestamp: new Date(),
          type: 'message',
        }
        messages.push(message)
        app.io.emit('chat', message)
      })
    })
  })
}
