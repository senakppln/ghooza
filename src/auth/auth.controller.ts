import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-temp-pass')
  async sendTempPass(@Body() phone: string) {
    return phone
  }

  @Post('login')
  async login(@Body() pass: string, phone: string) {
    return this.authService.loginWithCredentials(pass, phone)
  }
}
