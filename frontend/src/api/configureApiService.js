import axios from 'axios';
import { api, api2 } from './api';
import { requestInterceptor } from './requestInterceptor';
import { handleErrorResponse } from './responseInterceptor';

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use((response) => response, handleErrorResponse);

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

api2.interceptors.request.use(requestInterceptor);
api2.interceptors.response.use((response) => response, handleErrorResponse);

api2.CancelToken = axios.CancelToken;
api2.isCancel = axios.isCancel;
