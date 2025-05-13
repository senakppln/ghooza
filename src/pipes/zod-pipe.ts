import type { PipeTransform } from '@nestjs/common'
import type { z, ZodSchema } from 'zod'
import { BadRequestException } from '@nestjs/common'
import { ZodError } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown): z.infer<typeof this.schema> {
    try {
      this.schema.parse(value)
    }
    catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues)
      }
      throw error
    }
    return value
  }
}
