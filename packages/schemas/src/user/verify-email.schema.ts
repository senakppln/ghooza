import { z } from 'zod'

export const verifyEmailSchema = z.object({
  email: z.string().email(),
})

export type VerifyEmail = z.infer<typeof verifyEmailSchema>
