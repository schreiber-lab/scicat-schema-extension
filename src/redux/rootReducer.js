import { combineReducers } from "redux";
import { reducer as auth } from "./auth";
import { reducer as proposals } from './proposals';
import { reducer as datasets } from './datasets';
import { reducer as instruments } from './instruments';
import { reducer as mdSchemas } from './md-schemas';
import { reducer as fixedValueEntries } from './fixed-value-entries';
import { reducer as samples } from './samples';

export const rootReducer = combineReducers({
  auth,
  datasets,
  instruments,
  mdSchemas,
  fixedValueEntries,
  samples, 
  proposals,
});
