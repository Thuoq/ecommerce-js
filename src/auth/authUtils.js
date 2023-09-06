import jwt from 'jsonwebtoken'
export const createTokenPair = async (payload, { publicKey, privateKey }) => {
  try {
    // accessToken

    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    // refresh Token
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: '2 days'
    })

    return {
      accessToken,
      refreshToken
    }
  } catch (e) {
    console.log(e)
  }
}
