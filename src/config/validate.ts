import { environmentSchema } from './schema'

export function validate(config: Record<string, unknown>) {
  const parsedConfig = environmentSchema.safeParse(config)

  if (!parsedConfig.success) {
    throw new Error(
      parsedConfig.error.errors
        .map((err) => {
          const path = err.path.join(' -> ')
          return `Path: ${path}, Message: ${err.message}`
        })
        .join('\n'),
    )
  }

  return parsedConfig.data
}
