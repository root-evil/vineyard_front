import { InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";

const useStyles = makeStyles({
  helperText: {
    fontSize: ".75rem",
  },
  labelDisabled: {
    color: "#444444d9 !important",
  },
  disabled: {
    color: "#282828",
  },
});

const CustomTextField = ({
  value,
  onChange,
  helperText,
  disabled,
  label,
  fullWidth,
  endAdornment,
  rows,
  multiline,
  type,
  autoComplete,
  name,
  autoFocus,
  variant,
}) => {
  const ref = useRef();
  const classes = useStyles();

  useEffect(() => {
    let timer;
    if (autoFocus) {
      /* без таймаута не работает - но ref.current уже имеет элемент */
      timer = setTimeout(() => {
        ref?.current?.focus();
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [autoFocus]);

  return (
    <TextField
      inputRef={ref}
      value={value}
      name={name}
      variant={variant}
      onChange={(e) => onChange(e, e.target.value)}
      disabled={disabled}
      type={type || "text"}
      InputProps={{
        inputProps: {
          autoComplete: autoComplete || "new-password",
        },
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
        classes: {
          disabled: classes.disabled,
        },
      }}
      helperText={helperText}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          disabled: classes.labelDisabled,
        },
      }}
      label={label}
      fullWidth={fullWidth}
      rows={rows}
      autoCapitalize="none"
      multiline={multiline}
    />
  );
};

export default CustomTextField;
