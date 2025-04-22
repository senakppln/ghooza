import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(phone: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
        password,
      },
    })

    return user
  }
}
