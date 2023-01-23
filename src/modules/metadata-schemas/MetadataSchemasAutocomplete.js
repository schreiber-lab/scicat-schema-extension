import { Box, Typography } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import * as metadataSchemasApi from '../../api/metadata-schemas';
import { Autocomplete } from '../../components/Autocomplete';

const fetchMetadaSchemas = (params) => ({ loadedOptions = [] }) => {
  return metadataSchemasApi.getMetadataSchemas({
    params: {
    //   page: page + 1,

      ...params
    }
  }).then((data) => {
    return {
    //   hasMore: pagination.page < pagination.last_page && pagination.total > 0,
      options: loadedOptions.concat(data.filter(({ fixed_value_entries }) => fixed_value_entries)),
      // options: loadedOptions.concat(data),
    //   additionalData: {
    //     page: pagination.page
    //   }
    };
  });
};

const renderOption = (option) => {
  return !option?.isCreatableOption ? (
    <Box clone width="100%" overflow="hidden">
      <Typography>{option?.schema_name}</Typography>
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

export const MetadataSchemasAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Metadata schemas"
      placeholder="Search metadata schema..."
      onNeedFetch={fetchMetadaSchemas(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && option?.schema_name)}
      getOptionValue={(option) => option?.schema_name}
      getOptionSelected={(option, value) => option?.schema_name === value?.schema_name}
      onCreate={(value) => Promise.resolve({ _id: value })}

      {...props}
    />
  );
};
