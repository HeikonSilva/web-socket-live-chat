import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import autoLoad from '@fastify/autoload'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BACK_HOST = process.env.BACK_HOST
const BACK_PORT = Number(process.env.BACK_PORT)

const FRONT_HOST = process.env.FRONT_HOST
const FRONT_PORT = Number(process.env.FRONT_PORT)

const app = fastify()

app.register(fastifyCors, {
  origin: `http://${FRONT_HOST}:${FRONT_PORT}`,
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'WebSocket Live Chat',
      version: '1.0.0',
    },
  },
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// tspmo.ts

app.register(autoLoad, {
  dir: join(__dirname, 'routes/**.*'),
})

app.listen({ host: BACK_HOST, port: BACK_PORT }, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
