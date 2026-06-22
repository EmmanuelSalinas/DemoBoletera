/* import axios from "axios"
import Storage from "@/app/storage"
import { baseURL } from "@/app/configuration"
import router from "../router"

const headers = { "Content-Type": "application/json" }
const headersFiles = {
    "Content-Type": "file.type",
    boundary: "****************",
}

const AXIOS_IMPLEMENTATION = axios.create({ baseURL, headers })
const AXIOS_IMPLEMENTATION_FILES = axios.create({
    baseURL,
    headers: headersFiles,
})

const { request, response } = AXIOS_IMPLEMENTATION.interceptors

request.use(async (configuration) => {
    const { token } = (Storage as any).state.session
    const DEFAULT_BEARER_TOKEN = `Bearer ${token}`
    configuration.headers.Authorization = DEFAULT_BEARER_TOKEN
    return configuration
})

response.use(
    (data) => data,
    function (data) {
        return data.response
    }
)

export default Object({
    get: async function (endpoint: string, payload: any) {
        const params = new URLSearchParams(payload)

        const response = await AXIOS_IMPLEMENTATION.get(endpoint, { params })

        if (response.status === 401) {
            ;(Storage as any).commit("session/deleteCredentials")
            router.push({ name: "TLandingPage" })
        }
        if (response.status === 404) {
            router.push({ name: "TErrorPage" })
        }
        return response
    },
    put: async function (endpoint: string, payload: any) {
        return AXIOS_IMPLEMENTATION.put(endpoint, payload)
    },
    post: async function (endpoint: string, payload: any) {
        const response: any = await AXIOS_IMPLEMENTATION.post(endpoint, payload)

        if (response.status === 401) {
            ;(Storage as any).commit("session/deleteCredentials")
            router.push({ name: "TLandingPage" })
        }
        return response
    },
    delete: async function (endpoint: string, value: any) {
        return AXIOS_IMPLEMENTATION.delete(endpoint, { data: value })
    },
})
 */

export default Object({
    get: async function (endpoint: string, payload: any) {
        const params = new URLSearchParams(payload)

        const response = {}
        return response
    },
    put: async function (endpoint: string, payload: any) {
        return {}
    },
    post: async function (endpoint: string, payload: any) {
        const response: any = {}

        return response
    },
    delete: async function (endpoint: string, value: any) {
        return {}
    },
})