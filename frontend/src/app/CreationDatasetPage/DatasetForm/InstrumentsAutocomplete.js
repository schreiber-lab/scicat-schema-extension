import { Box, Typography } from '@material-ui/core';
import * as instrumentsApi from '../../../api/instruments';
import { Autocomplete } from '../../../components/Autocomplete';

const fetchInstruments = (params) => ({ search, loadedOptions = [], additionalData: { page = 0 } }) => {
    console.log(loadedOptions)
  return instrumentsApi.getInstruments({
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
      <Typography>{option?.name}</Typography>
    </Box>
  );
};

export const InstrumentsAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Instruments"
      placeholder="Search and add instrument..."
      onNeedFetch={fetchInstruments(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && option?.name)}
      getOptionValue={(option) => option?.pid}
      getOptionSelected={(option, value) => option?.pid === value?.pid}

      {...props}
    />
  );
};
