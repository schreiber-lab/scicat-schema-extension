import { api } from '../api';

export const login = (data) => {
  return api.post('/Users/login', data).then(({ data }) => {
    return data;
  }).catch((data) => {
    throw data;
  });
};
