import { get } from '@/service/index'

export const getPrompt = (keyword: string) => {
  return get<Record<string, any>>(`/api/location/prompt?keyword=${keyword}`)
}

export const getDistance = (origins: string, destination: string) => {
  return get<Record<string, any>>(
    `/api/location/distance?origins=${origins}&destination=${destination}`
  )
}

export const getGeocode = (address: string) => {
  return get<Record<string, any>>(`/api/location/geocode?address=${address}`)
}
