import { Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Post('send-code')
  async sendVerificationCode() {
    return 'sendVerificationCode'
  }

  @Post('register')
  async register() {
    return 'register'
  }

  @Post('login')
  async login() {
    return 'login'
  }
}
