/** @jsxImportSource theme-ui */
import React, { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  value: any;
  label: string;
}

const Input = ({ labelProps, label, ...props }: InputProps) => {
  const [touched, setTouched] = useState(false);
  const handleBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 150ms",
        my: 2,
        "&:focus-within label": {
          fontSize: 1,
          top: "-1.9rem",
          left: 0,
          display: "none",
        },
      }}
    >
      <label
        htmlFor={props.id}
        sx={{
          position: "absolute",
          top: props.value ? "-1.9rem" : 0,
          fontSize: props.value ? 1 : "body",
          transition: "all 150ms",
          py: 2,
          px: 3,
        }}
        {...labelProps}
      >
        {label}
      </label>
      <input
        {...props}
        sx={{
          border: (theme) => `1px solid ${theme.colors?.background}`,
          px: 2,
          py: 3,
          bg: "transparent",
          borderRadius: 3,
          transition: "150ms",
          color: "black",
          "&:focus": {
            outline: "none",
          },
          "&:invalid": {
            borderColor: touched ? "red" : "inherit",
          },
        }}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;
