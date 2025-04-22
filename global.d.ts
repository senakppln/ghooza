import type { EnvironmentSchema } from 'src/config/schema'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentSchema {}
  }
}

declare module 'express' {
  interface Request {
    cookies: Record<string, string | undefined>
  }
}

export {}
