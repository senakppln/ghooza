import randomstring from 'randomstring'

export function generateToken() {
  const token = randomstring.generate({
    length: 6,
    charset: 'numeric',
  })

  return token
}
