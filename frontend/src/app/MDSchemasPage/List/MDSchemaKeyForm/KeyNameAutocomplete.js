import { Box, Typography } from '@material-ui/core';
import * as mdSchemasApi from "../../../api/md-schemas";
import { Autocomplete } from '../../../components/Autocomplete';

const fetchKeyNames = (params) => ({ search, loadedOptions = [], additionalData: { page = 0 } }) => {
    console.log(loadedOptions)
  return mdSchemasApi.getMDSchemaKeys({
    params: {
      find: search,
    //   page: page + 1,

      ...params
    }
  }).then((data) => {
    console.log(data)
    return {
    //   hasMore: pagination.page < pagination.last_page && pagination.total > 0,
      options: loadedOptions.concat(data),
    //   additionalData: {
    //     page: pagination.page
    //   }
    };
  });
};

const renderOption = (option) => {
  return (
    <Box clone width="100%" overflow="hidden">
      <Typography>{option?.key_name} - {option?.description}</Typography>
    </Box>
  );
};

export const KeyNameAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Key name"
      placeholder="Search and add key name..."
      onNeedFetch={fetchKeyNames(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && `${option?.key_name} - ${option?.description}`)}
      getOptionValue={(option) => option?.key_name}
      getOptionSelected={(option, value) => option?.key_name === value?.key_name}

      {...props}
    />
  );
};
