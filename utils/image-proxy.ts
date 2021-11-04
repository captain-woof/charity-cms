export const getProxiedUrl = (url: string): string => (`/api/imageproxy?url=${encodeURIComponent(url)}`)
