import { AuthService } from '@app/auth'
import { ZodValidationPipe } from '@app/pipes'
import { Body, Controller, forwardRef, Inject, Patch, Post, Req } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Request } from 'express'
import { ConfirmEmail, confirmEmailSchema, UpdateUser, updateUserSchema, VerifyEmail, verifyEmailSchema } from 'schemas'
import { ResponseUserDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('find-one')
  async findOne(@Body() input: string) {
    const user = await this.userService.findOne(input)
    return plainToInstance(ResponseUserDto, user)
  }

  @Patch('update')
  async update(@Body(new ZodValidationPipe(updateUserSchema)) updateUser: UpdateUser, @Req() req: Request) {
    return this.userService.update(req.user!, updateUser)
  }

  @Post('verify-email')
  async verifyEmail(@Req() req: Request, @Body(new ZodValidationPipe(verifyEmailSchema)) verifyEmail: VerifyEmail) {
    return this.authService.sendTempPass(verifyEmail, req.user)
  }

  @Post('confirm-email')
  async confirmEmail(@Req() req: Request, @Body(new ZodValidationPipe(confirmEmailSchema)) confirmEmail: ConfirmEmail) {
    await this.userService.confirmEmail(req.user!, confirmEmail)
  }
}
