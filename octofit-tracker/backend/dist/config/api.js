/**
 * API configuration for Codespaces and localhost
 */
export const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:8000`;
};
export const API_BASE_URL = getApiUrl();
export const API_PORT = Number(process.env.PORT || 8000);
export default {
    baseUrl: API_BASE_URL,
    port: API_PORT,
    getApiUrl,
};
