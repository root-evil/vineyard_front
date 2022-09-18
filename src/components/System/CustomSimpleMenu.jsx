import { MenuItem, TextField } from "@material-ui/core";
import React from "react";

const CustomSimpleMenu = ({
  defaultValue,
  value,
  onChange,
  disabled,
  label,
  fullWidth,
  options,
  renderOption,
  style,
  name,
}) => {
  const mapOptions = options.map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {renderOption ? renderOption(item) : item.label}
    </MenuItem>
  ));

  return (
    <TextField
      name={name}
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(e) => onChange(e, e.target.value)}
      label={label}
      disabled={disabled}
      fullWidth={fullWidth}
      select
      style={style}
      defaultValue={defaultValue}
      SelectProps={{
        MenuProps: {
          style: {
            zIndex: 999999,
          },
        },
      }}
    >
      {mapOptions}
    </TextField>
  );
};

export default CustomSimpleMenu;
