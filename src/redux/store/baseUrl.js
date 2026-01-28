// Get base URL from environment variable with fallback
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://10.10.7.79:3001";

export { baseUrl };
