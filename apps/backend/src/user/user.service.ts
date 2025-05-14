import { Injectable } from '@nestjs/common'
import { SignUp } from 'schemas'
import { PrismaService } from 'src/database'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(input: string) {
    if (input == null) {
      return null
    }
    const where = input.includes('@')
      ? { email: input }
      : { phone: input }

    const user = await this.prismaService.user.findUnique({
      where,
    })

    return user
  }

  async create(signUp: SignUp) {
    const { input, name } = signUp

    const data = input.includes('@')
      ? { email: input, name }
      : { phone: input, name }

    return this.prismaService.user.create({ data })
  }
}
