import jwt from 'jsonwebtoken'
import { asyncHandler, AuthFailureError, BadRequestError, HEADER, NotFoundError } from '../core/index.js'
import KeyTokenService from '../services/keyToken.service.js'

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

export const authentication = asyncHandler(async (req, res, next) => {
  /*
      1 - Check userId missing ?
      2 - get AccessToken
      3 - Verify Tokens
      4 - Check user in bds
      5 - check keyStore with userId
      6 - Ok all => return next
   */

  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new BadRequestError('Invalid request')

  // 2

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('User do not login')

  // 3

  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('access token not found')

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid user')
    req.keyStore = keyStore
    req.user = keyStore.user
    return next()
  } catch (e) {
    throw new BadRequestError('Error')
  }
})

export const checkRefreshToken = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new BadRequestError('Invalid request')

  // 2

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('User do not login')

  const refreshToken = req.headers[HEADER.REFRESH_TOKEN]
  if (!refreshToken) throw new AuthFailureError('Refresh token not found')

  try {
    const decodeUser = jwt.verify(refreshToken, keyStore.privateKey)
    if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid user')
    req.refreshToken = refreshToken
    req.keyStore = keyStore
    req.user = keyStore.user
    return next()
  } catch (e) {
    throw new BadRequestError(e.message || 'Error')
  }
})
