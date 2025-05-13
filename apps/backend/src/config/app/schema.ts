import { z } from 'zod'

export const appSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production']),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
})
