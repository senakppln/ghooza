import { z } from 'zod'

export const confirmEmailSchema = z.object({
  password: z.string(),
})

export type ConfirmEmail = z.infer<typeof confirmEmailSchema>
