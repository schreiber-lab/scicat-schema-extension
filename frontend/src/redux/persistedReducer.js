import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";
import { env } from '../env';

const persistConfig = {
  key: env.REACT_APP_STORE_KEY,
  storage,
  whitelist: [
    "auth"
  ]
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
