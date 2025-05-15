import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ResponseUserDto {
  @Expose()
  uuid: string

  @Expose()
  email?: string

  @Expose()
  name: string

  @Expose()
  phone?: string
}
