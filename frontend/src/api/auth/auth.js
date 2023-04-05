import { api } from '../api';

export const login = (data) => {
  return api.post('/auth/login', data).then(({ data }) => {
    return data;
  }).catch((data) => {
    throw data;
  });
};
