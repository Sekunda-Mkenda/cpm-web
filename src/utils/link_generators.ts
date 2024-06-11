
const getStaticAssetUrl = (resourceUrl: string) => {
    return import.meta.env.VITE_API_URL_PLAIN + '/' + resourceUrl
}

export { getStaticAssetUrl }