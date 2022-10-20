import { useEffect, useState } from "react";
import { InputAdornment, IconButton, Tooltip } from "@material-ui/core";
import KeyboardCapslockIcon from "@material-ui/icons/KeyboardCapslock";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { TextField } from "../TextField";

export const PasswordField = (props) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isCapsLockModifier, setIsCapsLockModifier] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordIsVisible((isVisible) => !isVisible);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      setIsCapsLockModifier(event?.getModifierState("CapsLock"));
    };

    document.addEventListener("keypress", handleKeyDown);

    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  }, []);

  return (
    <TextField
      type={passwordIsVisible ? "text" : "password" }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" color="primary">
            {isCapsLockModifier && (
              <Tooltip title="Caps lock is ON">
                <KeyboardCapslockIcon />
              </Tooltip>
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              title={passwordIsVisible ? "Hide password" : "Show password"}
              onClick={togglePasswordVisibility}
            >
              {passwordIsVisible ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
