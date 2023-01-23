export const styles = ({ spacing }) => ({
    endAdornment: {
      position: 'absolute',
      bottom: 20,
      right: 0
    },
  
    clearIndicator: {
      // paddingLeft: spacing(1),
      // paddingRight: spacing(1), 
      marginRight: spacing(-0.25)
    },
  
    input_multiple: {
      '& > input': {
        minWidth: 0
      }
    },
  
    input_open: {
      '&$input_multiple > input': {
        minWidth: '100%',
      }
    },
  
    input_WithLoadingIndicator: {
      paddingRight: spacing(3)
    },
  
    input_WithClearButton: {
      paddingRight: spacing(3)
    },
  
    input_WithDropdownButton: {
      paddingRight: spacing(3)
    },
  
    input: {
      [[
        '&$input_WithLoadingIndicator&$input_WithClearButton,',
        '&$input_WithLoadingIndicator&$input_WithDropdownButton,',
        '&$input_WithClearButton&$input_WithDropdownButton'
      ].join('')]: {
        paddingRight: spacing(6)
      }
    },
  
    '$input_WithLoadingIndicator$input_WithClearButton$input_WithDropdownButton': {
      paddingRight: spacing(9)
    }
  });
  