import axios from 'axios';
import { api } from './api';
import { requestInterceptor } from './requestInterceptor';
import { handleErrorResponse } from './responseInterceptor';

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use((response) => response, handleErrorResponse);

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;
