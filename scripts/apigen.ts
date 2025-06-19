import 'dotenv/config'

import { createClient } from '@hey-api/openapi-ts'

const BACK_HOST = process.env.VITE_BACK_HOST
const BACK_PORT = Number(process.env.VITE_BACK_PORT)

try {
  await createClient({
    plugins: ['@hey-api/client-fetch'],
    input: `http://${BACK_HOST}:${BACK_PORT}/docs/json`,
    output: './src/api',
  })
} catch (error) {
  console.error('Error generating API client:', error)
}
