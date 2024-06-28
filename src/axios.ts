import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'

const token = useCookies(['ACCESS_TOKEN_COOKIE'])
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
})

axiosInstance.interceptors.request.use(
    (config: any) => {
        // Create headers object if not present
        config.headers = config.headers || {}
        const urlEndName = config.url.split('/').pop()
        if (!['registration', 'login'].includes(urlEndName)) {
            config.headers['Authorization'] = `Token ${token.get('ACCESS_TOKEN_COOKIE')}`
        }
        //Attaching important headers to request
        config.headers['Content-Type'] = 'application/json'
        config.headers['Accept'] = 'application/json'

        return config
    },
    (error: Error) => {
        return Promise.reject(error)
    }
)
export { axiosInstance }
