import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@material-ui/core";
import * as fixedValueEntriesApi from "../../api/fixed-value-entries";
import { Autocomplete } from "../../components/Autocomplete";

const fetchFixedValueEntries =
  (params) =>
  ({ loadedOptions = [] }) => {
    return fixedValueEntriesApi
      .getFixedValueEntries({
        params: {
          //   page: page + 1,

          ...params,
        },
      })
      .then((data) => {
        return {
          //   hasMore: pagination.page < pagination.last_page && pagination.total > 0,
          options: loadedOptions.concat(data.entries),
          //   additionalData: {
          //     page: pagination.page
          //   }
        };
      });
  };

export const FixedValueEntriesAutocomplete = ({
  baseKey,
  keyName,
  params = {},
  onChange,
  ...props
}) => {
  const { getValues, setValue } = useFormContext();

  const handleChange = (entry) => {
    Object.keys(getValues(baseKey)).forEach((key) => {
      setValue(`${baseKey}.${key}`, entry[key]);
    }, {});
    onChange(entry);
  };

  return (
    <Autocomplete
      isAsync
      label={keyName}
      placeholder="Search entry..."
      onNeedFetch={fetchFixedValueEntries(params)}
      onChange={handleChange}
      getOptionLabel={(option) => option && option[keyName]}
      getOptionValue={(option) => option?.[keyName] || null}
      getOptionSelected={(option, value) => option[keyName] === value[keyName]}
      renderOption={(option) => {
        return (
          <Box clone width="100%" overflow="hidden">
            <Typography>{option[keyName]}</Typography>
          </Box>
        );
      }}
      {...props}
    />
  );
};
