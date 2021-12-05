import { request } from '../request/index.js'

export function getGoodsList(data) {
  return request({
    url:'/api/public/v1/goods/search',
    method: 'GET',
    data
  })
}