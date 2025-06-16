import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import 'dotenv/config'

const BACK_HOST = process.env.BACK_HOST
const BACK_PORT = Number(process.env.BACK_PORT)
const FRONT_HOST = process.env.FRONT_HOST
const FRONT_PORT = Number(process.env.FRONT_PORT)
const BACK_SWAGGER = process.env.BACK_SWAGGER

const app = new Elysia({
  adapter: node(),
  serve: { hostname: BACK_HOST, port: BACK_PORT },
})

app.use(
  swagger({
    path: BACK_SWAGGER,
    documentation: { info: { title: 'WebSocket Live Chat', version: '1.0.0' } },
  })
)

app.use(cors({ origin: `http://${FRONT_HOST}:${FRONT_PORT}` }))

app.listen(BACK_PORT, () => {
  console.log(`🦊 Elysia is running at http://${BACK_HOST}:${BACK_PORT}`)
})
