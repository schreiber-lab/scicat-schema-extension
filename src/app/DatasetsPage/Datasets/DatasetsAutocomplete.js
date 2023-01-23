import { Box, Typography } from '@material-ui/core';
import * as datasetsApi from '../../../api/datasets';
import { Autocomplete } from '../../../components/Autocomplete';

const fetchDatasets = (params) => ({ search, loadedOptions = [], additionalData: { page = 0 } }) => {
    console.log(loadedOptions)
  return datasetsApi.getDatasets({
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
      <Typography>{option?.pid}</Typography>
    </Box>
  );
};

export const DatasetsAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Datasets"
      placeholder="Search dataset..."
      onNeedFetch={fetchDatasets(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && option?.pid)}
      getOptionValue={(option) => option?.pid}
      getOptionSelected={(option, value) => option?.pid === value?.pid}

      {...props}
    />
  );
};
