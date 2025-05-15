import { AuthService, UserPayload } from '@app/auth'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { User } from 'prisma-generated/client'
import { ConfirmEmail, SignUp, UpdateUser } from 'schemas'
import { PrismaService } from 'src/database'

@Injectable()
export class UserService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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
    const { email, name, phone } = signUp

    return this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
      },
    })
  }

  async update(user: User | UserPayload, updateUser: UpdateUser) {
    return this.prismaService.user.update({
      where: { phone: user.phone },
      data: { name: updateUser.name },
    })
  }

  async confirmEmail(user: User | UserPayload, confirmEmail: ConfirmEmail) {
    const email = await this.redis.get(`user:${user.phone}`)

    if (email == null) {
      throw new Error('Email not found')
    }

    await this.authService.validateTempPass(email, confirmEmail.password)

    return this.prismaService.user.update({
      where: { phone: user.phone },
      data: { email },
    })
  }
}
