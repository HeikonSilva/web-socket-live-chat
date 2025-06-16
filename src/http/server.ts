import fastify from 'fastify'

import fastifyIO from 'fastify-socket.io'

const app = fastify()

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
