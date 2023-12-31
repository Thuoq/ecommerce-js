import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop'
    },
    publicKey: {
      type: String,
      required: true
    },
    privateKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      // detect hacker get token
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)
export const keyTokenModel = model(DOCUMENT_NAME, keyTokenSchema)
