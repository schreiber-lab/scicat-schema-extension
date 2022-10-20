import { store } from "../redux";

export const requestInterceptor = (config) => {
  const { authToken } = store.getState().auth;
  
  config.headers = {
    ...(config.headers || {}),
    
    Authorization: config.headers?.Authorization || authToken,
  };
  
  return config;
};
