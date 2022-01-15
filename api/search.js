import { request } from '../request/index.js'

export function getSearch(name) {
  return request({
    url: `/api/public/v1/goods/search?query=${name}`,
    method: 'GET'
  })
}