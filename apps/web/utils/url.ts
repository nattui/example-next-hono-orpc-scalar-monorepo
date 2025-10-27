export const BASE_URL = {
  API: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002",
  WEB: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3001",
}

export const API = {
  AUTH: {
    SIGNIN_CREDENTIAL: `${BASE_URL.WEB}/api/auth/signin/credential`,
    SIGNOUT: `${BASE_URL.WEB}/api/auth/signout`,
    SIGNUP_CREDENTIAL: `${BASE_URL.WEB}/api/auth/signup/credential`,
    VERIFY: `${BASE_URL.WEB}/api/auth/verify`,
  },
  TEST: `${BASE_URL.WEB}/api/test`,
  USERS: `${BASE_URL.WEB}/api/users`,
}
