import { request } from '../request/index.js'
export function getSwiperData () {
  return request({
      url: '/api/public/v1/home/swiperdata',
      method: 'GET'
    }
  )
}
export function getNavData () {
  return request({
      url: '/api/public/v1/home/catitems',
      method: 'GET'
    }
  )
}
export function getFloorData () {
  return request({
      url: '/api/public/v1/home/floordata',
      method: 'GET'
    }
  )
}