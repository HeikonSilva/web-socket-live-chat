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

// Group consecutive messages from the same author
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
          <div key={msg.id} className="group flex flex-row items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="bg-white rounded-lg px-4 py-2 max-w-xs shadow-md space-y-1 border border-gray-200 relative"
            >
              {/* Show username only on the first message of the group */}
              {idx === 0 && (
                <span className="font-semibold text-sm text-teal-600 block mb-1">
                  {msg.username}
                </span>
              )}
              <p className="text-base text-gray-800 break-words">
                {msg.message}
              </p>
            </motion.div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-700 ml-1">
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

  // Join room on mount
  useEffect(() => {
    socket.emit('join', username)
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

  // Online users
  useEffect(() => {
    socket.on('online-users', (users: User[]) => {
      setOnlineUsers(users)
    })
    return () => {
      socket.off('online-users')
    }
  }, [])

  // New message
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

  const handleSend = () => {
    if (!input.trim()) return
    socket.emit('message', input)
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  if (!status) {
    return (
      <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 min-h-screen min-w-screen flex justify-center items-center">
        <div className="bg-white/50 w-full max-w-lg h-fit min-h-[320px] flex rounded-2xl shadow-xl flex-col gap-4 p-8 justify-center items-center">
          <h1 className="text-4xl font-bold text-teal-500">Come Back Later</h1>
          <p className="text-lg text-gray-700 text-center">
            API is currently offline. Try again later.
          </p>
        </div>
      </div>
    )
  }

  const grouped = groupMessages(messages)

  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 min-h-screen min-w-screen flex sm:flex-row flex-col p-4 gap-4 justify-center items-center">
      <div className="bg-white/50 w-full max-w-2xl h-[600px] flex rounded-2xl shadow-xl flex-col justify-center items-center">
        <div className="h-full w-full flex flex-col">
          <div className="h-16 rounded-t-2xl p-4 bg-white/90 shadow flex flex-row gap-4 items-center">
            <h1 className="font-bold text-lg">Global Chat</h1>
          </div>
          <ScrollToBottom className="flex-1 px-4 overflow-y-auto">
            <div className="pb-2 pt-4">
              {grouped.map((group) => (
                <div key={group.messages[0].id} className="mb-4">
                  <MessageGroup messages={group.messages} />
                </div>
              ))}
            </div>
          </ScrollToBottom>
          <div className="h-20 rounded-b-2xl p-4 bg-white/90">
            <div className="flex flex-row h-full w-full border border-teal-400 p-2 rounded-lg bg-white/80">
              <input
                ref={inputRef}
                type="text"
                className="w-full rounded-sm outline-none px-2 py-1 bg-transparent text-base"
                id="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                autoComplete="off"
              />
              <button
                className="ml-2 text-teal-400 hover:text-teal-600 hover:scale-110 transition-all p-1"
                onClick={handleSend}
                aria-label="Send message"
                type="button"
              >
                <SendHorizonal className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[600px] sm:w-64 w-full flex flex-col rounded-2xl shadow-lg bg-white/50">
        <div className="w-full h-16 bg-white/90 rounded-t-2xl shadow flex flex-row items-center justify-between px-4">
          <h1 className="font-bold text-base">Connected Users</h1>
          <span className="text-zinc-500 text-xs">
            {onlineUsers.length === 1
              ? `${onlineUsers.length} User Online`
              : `${onlineUsers.length} Users Online`}
          </span>
        </div>
        <div className="flex-1 rounded-b-2xl overflow-y-auto">
          <ul className="h-full w-full p-4 space-y-3">
            {onlineUsers.map((user) => (
              <li key={user.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="bg-white w-full p-3 rounded-xl text-gray-800 text-sm shadow-sm truncate"
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
