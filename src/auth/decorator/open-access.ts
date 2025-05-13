import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'openAccess'
export const OpenAccess = () => SetMetadata(IS_PUBLIC_KEY, true)
