export interface JwtConfig {
  accessToken: {
    secret: string
    expiration: string
  }
  refreshToken: {
    secret: string
    expiration: string
  }
}
