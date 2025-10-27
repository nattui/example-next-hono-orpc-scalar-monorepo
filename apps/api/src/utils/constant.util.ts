const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret || jwtSecret.trim() === "") {
  throw new Error(
    "JWT_SECRET environment variable is required but not set. Please set a valid JWT_SECRET in your environment variables.",
  )
}

export const JWT_SECRET = jwtSecret
