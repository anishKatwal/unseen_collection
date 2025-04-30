const config = {
  baseApiUrl: import.meta.env.VITE_API_URL,
  appUrl: import.meta.env.VITE_APP_URL,
  totalTables: import.meta.env.VITE_RESTAURANT_TABLES || 16,
};

export default config;
