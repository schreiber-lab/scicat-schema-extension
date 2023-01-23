import { Box, Typography } from '@material-ui/core';
import * as proposalsApi from '../../../api/proposals';
import { Autocomplete } from '../../../components/Autocomplete';

const fetchProposals = (params) => ({ search, loadedOptions = [], additionalData: { page = 0 } }) => {
    console.log(loadedOptions)
  return proposalsApi.getProposals({
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
      <Typography>{option?.proposalId}</Typography>
    </Box>
  );
};

export const ProposalsAutocomplete = ({ params = {}, creatablePayload, ...props }) => {
  return (
    <Autocomplete
      isAsync
      label="Proposal"
      placeholder="Search and add proposal..."
      onNeedFetch={fetchProposals(params)}
      renderOption={renderOption}
      getOptionLabel={((option) => option && option?.proposalId)}
      getOptionValue={(option) => option?.proposalId}
      getOptionSelected={(option, value) => option?.proposalId === value?.proposalId}

      {...props}
    />
  );
};
