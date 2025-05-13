import type { UserPayload } from 'src/auth/types'
import type { ConfigSchema } from 'src/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigSchema {}
  }
}

declare module 'express' {
  interface Request {
    cookies: Record<string, string | undefined>
    user?: UserPayload
  }
}

export {}
