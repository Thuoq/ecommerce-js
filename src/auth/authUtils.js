import jwt from 'jsonwebtoken'
export const createTokenPair = async (payload, { publicKey, privateKey }) => {
  try {
    // accessToken

    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days'
    })

    // refresh Token

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days'
    })

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`Verify:: error`, err)
      } else {
        console.log(decode)
      }
    })
    return {
      accessToken,
      refreshToken
    }
  } catch (e) {
    console.log(e)
  }
}
