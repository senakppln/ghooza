import { ZodValidationPipe } from '@app/pipes'
import { Login, loginSchema, SendTempPass, sendTempPassSchema } from '@app/schemas'
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { OpenAccess } from './decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-temp-pass')
  @OpenAccess()
  @UseGuards()
  async sendTempPass(@Body(new ZodValidationPipe(sendTempPassSchema)) sendTempPass: SendTempPass) {
    return this.authService.sendTempPass(sendTempPass)
  }

  @Post('login')
  @OpenAccess()
  async login(@Body(new ZodValidationPipe(loginSchema)) login: Login, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginWithCredentials(login, res)
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.createCookies(req.user!, res, true)
  }
}
