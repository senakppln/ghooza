import { Controller, Patch } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Patch('update')
  async update() {
    return 'update'
  }
}
