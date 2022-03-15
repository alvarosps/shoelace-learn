import { AxiosRequestHeaders } from "axios"

interface User {
    accessToken?: string
}

export default function authHeader(): AxiosRequestHeaders {
    const user = JSON.parse(String(localStorage.getItem("user"))) as User | null
    return user?.accessToken ? { "x-access-token": user.accessToken } : {}
  }