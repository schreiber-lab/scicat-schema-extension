import { useState, forwardRef, useEffect, useCallback } from 'react';
import { isObject, isEqual, debounce, isEmpty, isNil } from 'lodash';
import cn from 'classnames';
import { makeStyles, Box, CircularProgress, InputAdornment, Chip, IconButton } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete, createFilterOptions } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useController, useFormContext, Controller } from 'react-hook-form';
import { TextField } from '../TextField';
import { styles } from './styles';

const useStyles = makeStyles(styles);

const transformFreeSoloToOption = (value) => {
  return typeof(value) === 'string' ? { label: value, value } : value;
};

const filter = createFilterOptions();

export const Autocomplete = forwardRef(({
  isCreatable = false,
  isAsync = false,
  disableClearable = false,
  disableSearch = false,
  disabled = false,
  multiple,
  freeSolo,
  options: optionsProp,
  getOptionValue = (option) => option && option?.value,
  getOptionLabel = (option) => option?.label,
  getOptionSelected = (option, value) => option?.value === value?.value,
  required,
  helperText,
  error: errorProp,
  name,
  value: valueProp,
  label,
  placeholder,
  margin,
  onChange = () => {},
  getInputProps = () => ({}),
  onNeedFetch = () => {},
  onCreate = () => {},

  ...props
}, ref) => {
  const classes = useStyles();
  // React Hook Form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fieldState, field } = (formContext && useController({
    name, control: formContext?.control
  })) || {};
  const errorMessage = fieldState?.error?.message;
  const [ additionalData, setAdditionalData ] = useState({});
  const [ hasMore, setHasMore ] = useState(true);
  const [ isFetched, setIsFetched ] = useState(false);
  const clearButtonIsVisible = !disableClearable && (multiple ? !isEmpty(field.value) : !isNil(field.value));

  const getDefaultValue = () => {
    if (isAsync) {
      return field.value;
    }

    if (multiple && field.value !== null) {
      return optionsProp?.filter((option) => field.value.includes(option.value)) || field.value;
    }

    return optionsProp.filter((option) => field.value === option.value)[0];
  };

  const transformValueToInputValue = (value) => {
    return (isObject(value) && getOptionLabel(value)) || (freeSolo && value) || '';
  };

  const [ open, setOpen ] = useState(false);
  const loading = isAsync && open && !isFetched;
  const [ options, setOptions ] = useState([]);
  const [ value, setValue ] = useState(formContext?.watch(name) || null);
  const [ inputValue, setInputValue ] = useState(null);

  const handleChange = (event, selectedOption) => {
    if (isCreatable && selectedOption?.isCreatableOption) {
      setInputValue('');

      onCreate(selectedOption.inputValue).then((option) => {
        if (!multiple) {
          setInputValue(getOptionLabel(option));
        }

        setOpen(false);
        handleChange(null, multiple ? options.concat(option) : option);
      }).catch(() => null);

      return;
    }

    const option = (multiple && !selectedOption?.length)
      ? null
      : freeSolo
        ? multiple
          ? selectedOption?.map(transformFreeSoloToOption)
          : transformFreeSoloToOption(selectedOption)
        : selectedOption;

    const formValue = (multiple ? option?.map(getOptionValue) : getOptionValue(option)) ?? null;

    field.onChange(formValue);

    setValue(option);
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
    if (!isAsync || !event || event.type !== 'change') {
      return;
    }

    setInputValue(value);

    if (isAsync) {
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
    handleChange(null, null);
    setInputValue('');
  };

  const transformOptionToValue = (option) => {
    return isObject(option) ? getOptionValue(option) : option;
  };

  useEffect(() => {
    if (loading) {
      loadOptions({ search: inputValue || null });
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
    const fieldMultiValue = multiple && field.value?.map(transformOptionToValue);
    const innerMultiValue = multiple && value?.map(transformOptionToValue);
    const fieldValue = multiple ? fieldMultiValue : transformOptionToValue(field.value);
    const innerValue = multiple ? innerMultiValue : transformOptionToValue(value);
    const isObjectValue = multiple
      ? field.value?.length && field.value?.every(isObject)
      : isObject(field.value);

    if (!isEqual(fieldValue, innerValue)) {
      setValue(field.value);

      if (!multiple) {
        setInputValue(getOptionLabel(field.value));
      }

      field.onChange(fieldValue);
    } else if (isObjectValue) {
      field.onChange(fieldValue);
    }
  }, [ field.value ]);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={() => (
        <MuiAutocomplete
          openOnFocus
          clearOnBlur
          clearOnEscape
          disableClearable
          loading={loading}
          forcePopupIcon={false}
          selectOnFocus={!disableSearch}
          freeSolo={freeSolo}
          multiple={multiple}
          disabled={disabled}
          inputValue={inputValue || transformValueToInputValue(value)}
          name={name}
          value={valueProp || value || (multiple ? [] : null)}
          open={open}
          options={optionsProp || options}
          onOpen={handleOpen}
          onClose={handleClose}
          onInputChange={handleInputChange}
          onChange={handleChange}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          renderTags={(value, getTagProps) => {
            return value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}

                label={getOptionLabel(option)}
                size={props.size}
              />
            ));
          }}
          renderInput={({ inputProps, ...params }) => {
            return (
              <TextField
                {...params}

                required={required}
                name={name}
                label={label}
                placeholder={placeholder}
                margin={margin}
                error={!!(errorProp || errorMessage)}
                helperText={errorMessage || helperText}
                inputProps={{
                  ...inputProps,

                  readOnly: disableSearch
                }}
                InputProps={{
                  ...params.InputProps,
                  ...getInputProps(value),

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
                        <IconButton
                          disabled={disabled}
                          size="small"
                          className={classes.clearIndicator}
                          onClick={handleClear}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      }

                      <IconButton
                        disabled={disabled}
                        size="small"
                        edge="end"
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
              />
            );
          }}
          filterOptions={(options, state) => {
            const filtered = disableSearch ? options : filter(options, state);

            if (isCreatable) {
              filtered.unshift({
                isCreatableOption: true,
                inputValue: state.inputValue,
                name: `Add ${state.inputValue}`
              });
            }

            return filtered;
          }}
          renderOption={(props, option) => (
            <li {...props}>
              {!!option.isCreatableOption &&
                <Box display="flex" mr={1}>
                  <AddIcon color="primary" />
                </Box>
              }

              {getOptionLabel(option)}
            </li>
          )}
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
      )}
    />
  );
});
