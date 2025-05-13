import { InjectRedis } from '@nestjs-modules/ioredis'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'
import Redis from 'ioredis'
import ms, { StringValue } from 'ms'
import { User } from 'prisma-generated/client'
import { Config, JwtConfig } from 'src/config'
import { UserService } from 'src/user'
import { UserPayload } from './types'
import { generateToken } from './util/generate-token'
import { Login, SendTempPass } from 'schemas'

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Config, true>,
  ) {}

  async sendTempPass(sendTempPass: SendTempPass) {
    const { email, phone } = sendTempPass

    const input = email?.trim() ?? phone?.trim()

    if (input == null) {
      throw new BadRequestException('Phone or email is required')
    }

    const user = await this.userService.findOne(input)

    if (!user) {
      return { userExists: false }
    }

    const tempPass = generateToken()
    const hashedPass = await bcrypt.hash(tempPass, 10)

    await this.redis.set(`pass:${user.uuid}`, hashedPass, 'EX', ms('5m'))
    return tempPass
  }

  async validateUser(input: string, password: string) {
    const user = await this.userService.findOne(input)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const redisPass = await this.redis.get(`pass:${user.uuid}`)

    if (redisPass == null) {
      throw new UnauthorizedException('Temporary password does not exist')
    }

    const isMatch = await bcrypt.compare(password, redisPass)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }

  async createCookies(user: User | UserPayload, res: Response, setRefresh = false) {
    const payload = { email: user.email, sub: (user as UserPayload).sub ?? (user as User).uuid }

    const accessToken = await this.jwt.signAsync(payload)

    const jwtConfig = this.config.get<JwtConfig>('jwt')

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtConfig.accessToken.expiration as StringValue),
    })

    if (!setRefresh) {
      return { accessToken }
    }

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: jwtConfig.refreshToken.secret,
      expiresIn: jwtConfig.refreshToken.expiration,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtConfig.refreshToken.expiration as StringValue),
    })
  }

  async loginWithCredentials(login: Login, res: Response) {
    const { email, phone, password } = login

    const input = email?.trim() ?? phone?.trim()

    if (input == null) {
      throw new BadRequestException('Phone or email is required')
    }

    const user = await this.validateUser(input, password)

    await this.createCookies(user, res, true)
  }
}
