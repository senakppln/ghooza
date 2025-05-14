import { InjectRedis } from '@nestjs-modules/ioredis'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'
import Redis from 'ioredis'
import ms, { StringValue } from 'ms'
import { User } from 'prisma-generated/client'
import { Login, SendTempPass, SignUp } from 'schemas'
import { Config, JwtConfig } from 'src/config'
import { UserService } from 'src/user'
import { UserPayload } from './types'
import { generateToken } from './util/generate-token'

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Config, true>,
  ) {}

  async sendTempPass(sendTempPass: SendTempPass) {
    const { input } = sendTempPass

    if (input == null) {
      throw new BadRequestException('Phone or email is required')
    }

    const tempPass = generateToken()
    const hashedPass = await bcrypt.hash(tempPass, 10)

    await this.redis.set(`pass:${input}`, hashedPass, 'EX', ms('2m'))
    return tempPass
  }

  async signUp(signUp: SignUp, res: Response) {
    const user = await this.userService.findOne(signUp.input)

    if (user) {
      throw new BadRequestException('User already exists')
    }

    const createdUser = await this.userService.create(signUp)

    await this.createCookies(createdUser, res)

    return createdUser
  }

  async validateTempPass(input: string, password: string) {
    const redisPass = await this.redis.get(`pass:${input}`)

    if (redisPass == null) {
      throw new UnauthorizedException('Temporary password does not exist')
    }

    const isMatch = await bcrypt.compare(password, redisPass)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password')
    }
  }

  async validateUser(input: string) {
    const user = await this.userService.findOne(input)

    if (!user) {
      return { isUser: false }
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
    const { input, password } = login

    if (input == null) {
      throw new BadRequestException('Phone or email is required')
    }

    await this.validateTempPass(input, password)

    const user = await this.validateUser(input)

    if ('isUser' in user) {
      return user
    }

    await this.createCookies(user, res, true)
  }
}
