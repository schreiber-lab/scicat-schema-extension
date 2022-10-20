import { useState, forwardRef, useEffect, useCallback } from "react";
import { isObject, isEqual, debounce } from "lodash";
import cn from "classnames";
import {
  makeStyles,
  Box,
  CircularProgress,
  InputAdornment,
  Chip,
  IconButton,
  TextField
} from "@material-ui/core";
import {
  Autocomplete as MuiAutocomplete,
  createFilterOptions
} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useController, useFormContext } from "react-hook-form";
import { Popper } from "./Popper";
import { styles } from "./styles";

const useStyles = makeStyles(styles);

const transformFreeSoloToOption = (value) => {
  return typeof value === "string" ? { label: value, value } : value;
};

const filter = createFilterOptions();

// prettier-ignore
export const Autocomplete = forwardRef(({
  preventManualChangeNotification = false,
  disableSearch = false,
  disabled = false,
  isAsync = false,
  isCreatable = false,
  multiple,
  freeSolo,
  value: valueProp,
  options: optionsProp,
  getOptionValue = (option) => option?.value || option,
  getOptionLabel: getOptionLabelProp = (option) => option?.label || option,
  getOptionSelected = (option, value) => (option?.value || option) === (value?.value || value),
  required,
  helperText,
  error: errorProp,
  name,
  label,
  placeholder,
  margin,
  TextFieldProps = {},
  onChange = () => {},
  getInputProps = () => ({}),
  onNeedFetch = () => {},
  onCreate = (value) => Promise.resolve(value),

  ...props
}, ref) => {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  const [ inputValue, setInputValue ] = useState(null);
  const inputValueIsString = typeof(inputValue) === 'string';
  const [ options, setOptions ] = useState([]);
  const [ additionalData, setAdditionalData ] = useState({});
  const [ hasMore, setHasMore ] = useState(true);
  const [ value, setValue ] = useState(null);
  const [ isFetched, setIsFetched ] = useState(false);
  const loading = isAsync && open && !isFetched;
  const clearButtonIsVisible = !props.disableClearable && !!(multiple ? value?.length : value);
  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fieldState } = (formContext && useController({
    name, control: formContext?.control
  })) || {};
  const errorMessage = fieldState?.error?.message;

  const getOptionLabel = (option) => {
    return option?.isCreatableOption ? option.name : getOptionLabelProp(option);
  };

  const transformValueToInputValue = (value) => {
    const optionLabel = getOptionLabel(value);

    return (isObject(value) && !isObject(optionLabel) && optionLabel ) || '';
  };

  const valueAsInputValue = transformValueToInputValue(valueProp) || transformValueToInputValue(value);

  const handleChange = (event, selectedOption) => {    
    if (isCreatable) {
      const creatableOption = multiple
        ? selectedOption?.find(({ isCreatableOption }) => isCreatableOption)
        : selectedOption;

      if (creatableOption?.isCreatableOption) {
        setInputValue('');

        onCreate(creatableOption.inputValue).then((option) => {
          console.log(option)
          if (!multiple) {
            setInputValue(getOptionLabel(option));
          }

          setOpen(false);
          handleChange(null, multiple ? (value || []).concat(option) : option);
        }).catch(() => null);

        return;
      }
    }

    const option = (multiple && !selectedOption?.length)
      ? null
      : freeSolo
        ? multiple ? selectedOption?.map(transformFreeSoloToOption) : transformFreeSoloToOption(selectedOption)
        : selectedOption;
    const formValue = multiple ? option?.map(getOptionValue) || [] : getOptionValue(option) || null;

    setValue(option);
    formContext?.setValue(name, formValue, { shouldValidate: true });
    onChange(option);
  };

  const loadOptions = ({ search, loadedOptions = [], additionalData = {} } = {}) => {
    onNeedFetch({
      search,
      loadedOptions,
      additionalData
    }).then(({ hasMore, options, additionalData }) => {
      const optionsHasValue = value && options.some((option) => {
        return multiple
          ? value.some((value) => getOptionSelected(option, value))
          : getOptionSelected(option, value);
      });

      setOptions(!value || optionsHasValue ? options : options.concat(value));
      setHasMore(hasMore);
      setAdditionalData(additionalData);
      setIsFetched(true);
    });
  };

  const handleSearch = useCallback(debounce(({ search, loadedOptions, additionalData }) => {
    loadOptions({ search, loadedOptions, additionalData });
  }, 600), []);

  const handleInputChange = (event, value) => {
    if (!event) {
      return;
    }

    setInputValue(value);

    if (isAsync && event.type !== 'click') {
      handleSearch({ search: value });
    }
  };

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    // handleChange(null, null);
    setInputValue('');
  };

  useEffect(() => {
    if (loading) {
      loadOptions();
    }
  }, [ loading ]);

  useEffect(() => {
    if (isAsync && !open) {
      setOptions([]);
      setAdditionalData({});
      setIsFetched(false);
    }
  }, [ open ]);

  useEffect(() => {
    if (!isEqual(valueProp, value)) {
      setValue(valueProp);
    }
  }, [ valueProp ]);

  return (
    <MuiAutocomplete
      openOnFocus
      clearOnBlur
      clearOnEscape
      disableClearable
      selectOnFocus={!disableSearch}
      disabled={disabled}
      inputValue={inputValueIsString ? inputValue : valueAsInputValue}
      loading={loading}
      forcePopupIcon={false}
      freeSolo={freeSolo}
      multiple={multiple}
      name={name}
      value={valueProp || value || (multiple ? [] : null)}
      open={open}
      options={optionsProp || options}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (isCreatable) {
          filtered.unshift({
            isCreatableOption: true,
            inputValue: params.inputValue,
            name: `Add ${params.inputValue}`
          });
        }

        return filtered;
      }}
      renderOption={(option) => (
        <>
          {!!option.isCreatableOption &&
            <Box display="flex" mr={1}>
              <AddIcon color="primary" />
            </Box>
          }

          {getOptionLabel(option)}
        </>
      )}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={handleInputChange}
      onChange={handleChange}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip {...getTagProps({ index })} label={getOptionLabel(option)} />
        ));
      }}
      PopperComponent={Popper}
      renderInput={({ inputProps: inputPropsProp, ...params }) => {
        const { autoComplete, ...inputProps } = inputPropsProp;

        return (
          <TextField
            {...params}

            // unbindForm
            name={name}
            inputProps={inputProps}
            required={required}
            label={label}
            placeholder={placeholder}
            margin={margin}
            error={!!(fieldState?.invalid) && !!(errorMessage)}
            helperText={((fieldState?.invalid) && (errorMessage)) || helperText}
            InputProps={{
              ...params.InputProps,
              ...getInputProps(value),

              readOnly: disableSearch,
              className: cn(
                params.InputProps.className,
                classes.input, classes.input_WithDropdownButton,
                {
                  [classes.input_open]: open,
                  [classes.input_multiple]: multiple,
                  [classes.input_WithLoadingIndicator]: loading,
                  [classes.input_WithClearButton]: clearButtonIsVisible
                }
              ),

              endAdornment: (
                <InputAdornment position="end" className={classes.endAdornment}>
                  {params.InputProps?.endAdornment}
                  {getInputProps(value)?.endAdornment}

                  {loading &&
                    <CircularProgress color="primary" size={20} />
                  }

                  {clearButtonIsVisible &&
                    <IconButton disabled={disabled} className={classes.clearIndicator} onClick={handleClear}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }

                  <IconButton
                    disabled={disabled}
                    className={cn(
                      'MuiAutocomplete-popupIndicator',
                      open && 'MuiAutocomplete-popupIndicatorOpen'
                    )}
                    onClick={toggleOpen}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}

            {...TextFieldProps}
          />
        );
      }}
      ListboxProps={{
        onScroll: (event) => {
          if (!isAsync || !hasMore) {
            return;
          }

          const listBoxNode = event.currentTarget;
          const isScrollEnd = listBoxNode.scrollTop + listBoxNode.clientHeight === listBoxNode.scrollHeight;

          if (isScrollEnd) {
            loadOptions({
              search: inputValue,
              loadedOptions: options,
              additionalData
            });
          }
        }
      }}

      {...props}

      ref={ref}
    />
  );
});
