import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().max(20).optional(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
