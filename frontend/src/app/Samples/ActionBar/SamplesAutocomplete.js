import { Box, Typography } from '@material-ui/core';
import * as samplesApi from '../../../api/samples';
import { Autocomplete } from '../../../components/Autocomplete';

const fetchSamples = (params) => ({ search, loadedOptions = [], additionalData: { page = 0 } }) => {
    console.log(loadedOptions)
  return samplesApi.getSamples({
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
      <Typography>{option?.sampleId} - {option?.description}</Typography>
    </Box>
  );
};

export const SamplesAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Sample"
      placeholder="Search sample..."
      onNeedFetch={fetchSamples(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && `${option?.sampleId} - ${option?.description}`)}
      getOptionValue={(option) => option?.sampleId}
      getOptionSelected={(option, value) => option?.sampleId === value?.sampleId}

      {...props}
    />
  );
};
