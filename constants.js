const PRODUCTION_API_BASE_URL = "https://the-foodie-express-backend.herokuapp.com"
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001"
export const API_BASE_URL = process.env.NODE_ENV == "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL