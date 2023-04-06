import { api } from '../api';

export const login = (data) => {
  return api.post('/users/login', data).then(({ data }) => {
    return data;
  }).catch((data) => {
    throw data;
  });
};
