const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

export const getApiBaseUrl = () => {
  if (!VITE_CODESPACE_NAME) {
    return 'https://localhost:8000/api';
  }

  return `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`;
};

export const fetchJson = async (resourcePath) => {
  const response = await fetch(`${getApiBaseUrl()}${resourcePath}`);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorBody}`);
  }

  const json = await response.json();
  return json;
};

export const normalizeResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    if (Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data.items)) {
      return data.items;
    }

    return Object.values(data);
  }

  return [];
};
