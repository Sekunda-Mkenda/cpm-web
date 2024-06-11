import { axiosInstance } from "@/axios"

const ApiService = {
  get(resource: any) {
    return axiosInstance.get(resource)
  },

  post(resource: any, data?: any) {
    return axiosInstance.post(resource, data)
  },

  put(resource: any, data: any) {
    return axiosInstance.put(resource, data)
  },
  patch(resource: any, data?: any) {
    return axiosInstance.patch(resource, data)
  },

  delete(resource: any) {
    return axiosInstance.delete(resource)
  },

  customRequest(data: any) {
    return axiosInstance(data)
  }
}

export { ApiService }
