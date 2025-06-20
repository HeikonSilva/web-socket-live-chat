import { SendHorizonal } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { useApiStatus } from '../utils/fetchHttpStatus'
import { useEffect, useRef, useState } from 'react'
import { socket } from '../socket'

import ScrollToBottom from 'react-scroll-to-bottom'

import { motion } from 'motion/react'

type MessageType = 'message'
interface Message {
  id: number
  userId?: string
  username?: string
  message: string
  timestamp: string | Date
  type: MessageType
}

interface User {
  id: string
  username: string
}

// Agrupa mensagens consecutivas do mesmo autor
function groupMessages(messages: Message[]) {
  const groups: {
    type: MessageType
    userId?: string
    username?: string
    messages: Message[]
  }[] = []
  let currentGroup: (typeof groups)[0] | null = null
  messages.forEach((msg) => {
    if (
      !currentGroup ||
      currentGroup.type !== 'message' ||
      currentGroup.userId !== msg.userId
    ) {
      currentGroup = {
        type: 'message',
        userId: msg.userId,
        username: msg.username,
        messages: [msg],
      }
      groups.push(currentGroup)
    } else {
      currentGroup.messages.push(msg)
    }
  })
  return groups
}

const MessageGroup = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {messages.map((msg, idx) => {
        const date =
          typeof msg.timestamp === 'string'
            ? new Date(msg.timestamp)
            : msg.timestamp
        const hourMinute = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        return (
          <div className="h-full group flex flex-row items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              key={msg.id}
              className="bg-white rounded-lg px-4 py-2 w-fit max-w-xs shadow-md space-y-1 border border-gray-200 relative"
            >
              <div className="flex items-center gap-2">
                {/* Só mostra username e timestamp na primeira msg do grupo */}
                {idx === 0 && (
                  <>
                    <span className="font-bold text-sm text-teal-600">
                      {msg.username}
                    </span>
                  </>
                )}
              </div>
              <p className="text-base text-gray-800 break-words">
                {msg.message}
              </p>
            </motion.div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-700 ml-auto">
              {hourMinute}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const [searchParams] = useSearchParams()
  const [status, loading, refresh] = useApiStatus()
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const username = searchParams.get('username') || 'No Name'

  useEffect(() => {
    refresh()
  }, [refresh])

  // Entrar na sala ao montar
  useEffect(() => {
    socket.emit('join', username)
    // Recebe histórico de mensagens ao entrar
    socket.on('chat-history', (history: Message[]) => {
      setMessages(
        history.map((msg) => ({
          ...msg,
          timestamp:
            typeof msg.timestamp === 'string'
              ? msg.timestamp
              : (msg.timestamp as unknown as string),
        }))
      )
    })
    return () => {
      socket.off('chat-history')
    }
    // eslint-disable-next-line
  }, [])

  // Usuários online
  useEffect(() => {
    socket.on('online-users', (users: User[]) => {
      setOnlineUsers(users)
    })
    return () => {
      socket.off('online-users')
    }
  }, [])

  // Nova mensagem recebida
  useEffect(() => {
    socket.on('chat', (data: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          timestamp:
            typeof data.timestamp === 'string'
              ? data.timestamp
              : (data.timestamp as unknown as string),
        },
      ])
    })
    return () => {
      socket.off('chat')
    }
  }, [])

  // Envio de mensagem
  const handleSend = () => {
    if (!input.trim()) return
    socket.emit('message', input)
    setInput('')
    inputRef.current?.focus()
  }

  // Enter envia mensagem
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  if (!status) {
    return (
      <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
        <div className="bg-white/40 w-1/2 h-2/3 flex rounded-2xl shadow-xl flex-col gap-4 p-4 justify-center items-center">
          <h1 className="text-4xl font-bold text-teal-500">Come Back Later</h1>
          <p className="text-lg text-gray-700">
            API is currently offline. Try again later.
          </p>
        </div>
      </div>
    )
  }

  // Agrupa mensagens consecutivas do mesmo autor
  const grouped = groupMessages(messages)

  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-evenly items-center">
      <div className="bg-white/40 w-1/2 h-2/3 flex rounded-2xl shadow-xl flex-col justify-center items-center">
        <div className="h-full w-full flex flex-col">
          <div className="h-3/28 rounded-t-2xl p-4 bg-white/85 shadow-md flex flex-row gap-4 items-center">
            <h1 className="font-bold">Global Chat</h1>
          </div>
          <ScrollToBottom className="h-21/28 rounded-t-2xl px-4 pt-4 overflow-y-scroll flex flex-col gap-4">
            <div className="pb-4">
              {grouped.map((group, idx) => (
                <MessageGroup
                  key={group.messages[0].id}
                  messages={group.messages}
                />
              ))}
            </div>
          </ScrollToBottom>
          <div className="h-4/28 rounded-b-2xl p-4 bg-white/85">
            <div className="flex flex-row h-full w-full border-2 border-teal-400 p-2 rounded-lg">
              <input
                ref={inputRef}
                type="text"
                className="w-full rounded-sm outline-none"
                id="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
              />
              <div>
                <button
                  className="size-full text-teal-400 hover:text-teal-600 hover:cursor-pointer transition-all"
                  onClick={handleSend}
                  aria-label="Send message"
                >
                  <SendHorizonal className="size-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2/3 w-1/5 flex flex-col rounded-2xl shadow-lg">
        <div className="w-full h-3/28 bg-white/85 rounded-t-2xl shadow-md p-4 items-center flex flex-row justify-between">
          <h1 className="font-bold">Connected Users</h1>
          <span className="text-zinc-500 text-sm">
            {onlineUsers.length === 1
              ? `${onlineUsers.length} User Online`
              : `${onlineUsers.length} Users Online`}
          </span>
        </div>
        <div className="w-full h-25/28 bg-white/24 rounded-b-2xl">
          <ul className="h-full w-full overflow-y-scroll p-4 space-y-4">
            {onlineUsers.map((user) => (
              <li key={user.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white w-full p-4 rounded-xl"
                >
                  {user.username}
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
