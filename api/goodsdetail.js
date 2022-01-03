import { request } from '../request/index.js'

export function getGoodsDetail (data) {
  return request({
    url: '/api/public/v1/goods/detail',
    method: 'GET',
    data
  })
}