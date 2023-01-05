import { env } from '../../../env';


export const defaultValues = {
  sampleId: null,
  description: null,
  owner: env.REACT_APP_SCICAT_DEFAULT_DS_OWNER,
  ownerGroup: env.REACT_APP_SCICAT_DEFAULT_DS_OWNER_GROUP,
};
