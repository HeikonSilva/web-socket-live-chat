import { treaty } from '@elysiajs/eden'
import type { App } from '../http/server'

const client = treaty<App>(
  `${import.meta.env.VITE_BACK_HOST}:${import.meta.env.VITE_BACK_PORT}`
)

export default client
