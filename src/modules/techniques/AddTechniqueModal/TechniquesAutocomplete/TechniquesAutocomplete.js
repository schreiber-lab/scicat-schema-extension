import { Box, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as fullfacetsApi from "../../../../api/fullfacets";
import { Autocomplete } from "../../../../components/Autocomplete";
import { useModal } from "../../../../components";
import { AddTechniqueModal } from "../AddTechniqueModal";

const fetchTechnique =
  (params) =>
  ({ loadedOptions = [] }) => {
    console.log(loadedOptions);

    return fullfacetsApi
      .getFullfacets({
        params: {
          facets: "techniques",
          //   page: page + 1,

          ...params,
        },
      })
      .then((data) => {
        return {
          //   hasMore: pagination.page < pagination.last_page && pagination.total > 0,
          options: loadedOptions.concat(data[0].techniques),
          //   additionalData: {
          //     page: pagination.page
          //   }
        };
      });
  };

const renderOption = (option) => {
  return !option?.isCreatableOption ? (
    <Box clone width="100%" overflow="hidden">
      <Typography>{option?._id?.name}</Typography>
    </Box>
  ) : (
    <>
      <Box display="flex" mr={1}>
        <AddIcon color="primary" />
      </Box>
      
      Add {option.inputValue || "technique"}
    </>
  );
};

export const TechniquesAutocomplete = ({
  params = {},
  creatablePayload,
  ...props
}) => {
  const { openModal } = useModal();

  const handleTechniqueCreate = (name) => {
    return new Promise((resolve, reject) => {
      openModal(AddTechniqueModal, {
        payload: {
          initialValues: {
            _id: {
              name
            }
          }
        },
        onModalResolved: resolve,
        onModalRejected: reject
      });
    });
  };

  return (
    <Autocomplete
      isAsync
      label="Techniques"
      placeholder="Search and add techniques..."
      onNeedFetch={fetchTechnique(params)}
      renderOption={renderOption}
      getOptionLabel={(option) => option && option?._id?.name}
      getOptionValue={(option) => option?._id}
      getOptionSelected={(option, value) =>
        option?._id?.pid === value?._id?.pid
      }
      onCreate={handleTechniqueCreate}
      {...props}
    />
  );
};
