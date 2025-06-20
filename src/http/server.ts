import 'dotenv/config'

import Fastify from 'fastify'

import fastifyCors from '@fastify/cors'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import fastifyAutoload from '@fastify/autoload'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import fastifySocketIO from '@ericedouard/fastify-socket.io'

const BACK_HOST = process.env.VITE_BACK_HOST
const BACK_PORT = Number(process.env.VITE_BACK_PORT)
const FRONT_HOST = process.env.FRONT_HOST
const FRONT_PORT = Number(process.env.FRONT_PORT)
const BACK_SWAGGER = process.env.BACK_SWAGGER

const app = Fastify().withTypeProvider<TypeBoxTypeProvider>()

await app.register(fastifyCors, {
  origin: `http://${FRONT_HOST}:${FRONT_PORT}`,
})

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'WebSocket Live Chat API',
      version: '1.0.0',
    },
  },
})

await app.register(fastifySwaggerUi, {
  routePrefix: BACK_SWAGGER,
})

await app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
})

await app.register(fastifySocketIO, {
  cors: {
    origin: `http://${FRONT_HOST}:${FRONT_PORT}`,
  },
})

app.listen({ port: BACK_PORT, host: BACK_HOST }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(
    `🦊 Fastify is running at ${address}\n Socket.io is running at ws://${BACK_HOST}:${BACK_PORT}`
  )
})
