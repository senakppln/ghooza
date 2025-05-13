import { z } from 'zod'

export const sendTempPassSchema = z.object({
  phone: z.string().regex(/^(\+90\s?)?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/).nullable(),
  email: z.string().nullable(),
})

export type SendTempPass = z.infer<typeof sendTempPassSchema>
