export type LoginBody = {
  email: string
  password: string
  rememberMe: boolean
}

export type MeResponse = {
  data: {
    email: string
    id: number
    login: string
  }
  message: string
  resultCode: number
}
