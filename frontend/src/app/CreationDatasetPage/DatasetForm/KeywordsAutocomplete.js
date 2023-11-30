import { Box, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as fullfacetsApi from '../../../api/fullfacets';
import { Autocomplete } from '../../../components/Autocomplete';

const transformKeywordResponse = ({ _id }) => _id;

const fetchKeywords = (params) => ({ loadedOptions = [] }) => {
  return fullfacetsApi.getFullfacets({
    params: {
      facets: [ 'keywords' ],
      fields: {},
    //   page: page + 1,

      ...params
    }
  }).then((data) => {
    console.log(data)
    return {
    //   hasMore: pagination.page < pagination.last_page && pagination.total > 0,
      options: loadedOptions.concat(data[0].keywords?.map(transformKeywordResponse) || []),
    //   additionalData: {
    //     page: pagination.page
    //   }
    };
  });
};

const renderOption = (option) => {
  return !option?.isCreatableOption ? (
    <Box clone width="100%" overflow="hidden">
      <Typography>{option}</Typography>
    </Box>
  ) : !option?.inputValue ? null : (
    <>
      <Box display="flex" mr={1}>
        <AddIcon color="primary" />
      </Box>

      Add {option.inputValue}
    </>
  );
};

export const KeywordsAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Keywords"
      placeholder="Search and add keywords..."
      onNeedFetch={fetchKeywords(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option)}
      getOptionValue={(option) => option}
      getOptionSelected={(option, value) => option === value}
      onCreate={(value) => Promise.resolve({ _id: value })}

      {...props}
    />
  );
};
