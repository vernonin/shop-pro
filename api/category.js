import { request } from '../request/index.js'

export function getCatesData() {
  return request({
    url: '/api/public/v1/categories',
    method: 'GET'
  })
}