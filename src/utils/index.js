import _ from 'lodash'
export const getInfoData = ({ fields = [], object = {} }) =>
  _.pick(object, fields)
