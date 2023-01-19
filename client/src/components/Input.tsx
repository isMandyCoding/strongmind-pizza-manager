/** @jsxImportSource theme-ui */
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useRef,
  useState,
} from "react";
import { SxProp } from "theme-ui";
import Button, { ButtonProps } from "./Button";
import InputErrorHelperText from "./InputErrorHelperText";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & SxProp & {};

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  SxProp & {
    labelProps?: LabelProps;
    buttonProps?: ButtonProps;
    value: any;
    label: string;
    errorMessage?: string;
  };

const Input = ({
  labelProps,
  buttonProps,
  label,
  errorMessage,
  className,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const handleBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  const handleLabelClick = () => {
    inputRef?.current?.focus();
  };

  return (
    <div
      sx={{
        position: "relative",
        transition: "all 150ms",
        my: 3,
        "&:focus-within label": {
          fontSize: 1,
          top: "-1.9rem",
          left: 0,
        },
      }}
    >
      <label
        className={labelProps?.className}
        onClick={handleLabelClick}
        htmlFor={props.id}
        sx={{
          position: "absolute",
          top: props.value ? "-1.9rem" : "0.75rem",
          fontSize: props.value ? 1 : "body",
          transition: "all 150ms",
          py: 2,
          px: 3,
          "&:hover": {
            cursor: "text",
          },
        }}
        {...labelProps}
      >
        {label}
      </label>
      <div
        sx={{
          variant: "flex.row",
          alignItems: "stretch",
        }}
      >
        <input
          className={className}
          ref={inputRef}
          sx={{
            border: (theme) => `1px solid ${theme.colors?.background}`,
            px: 2,
            py: 3,
            bg: "transparent",
            borderRadius: "0 2px 2px 0",
            transition: "150ms",
            color: "black",
            flexGrow: buttonProps ? 5 : 1,
            "&:focus": {
              outline: (theme) => `1px solid ${theme.colors?.background}`,
            },
            "&:invalid": {
              borderColor: touched ? "red" : "inherit",
            },
          }}
          onBlur={handleBlur}
          {...props}
        />
        {buttonProps ? (
          <Button
            className={buttonProps.className}
            sx={{
              px: 4,
              color: "white",
              bg: buttonProps.color ?? "transparent",
              border: "none",
              borderRadius: "0 2px 2px 0",
              flexGrow: 1,
              "&:hover": {
                cursor: "pointer",
              },
              "&:focus, :focus-visible": {
                border: "solid 1px black",
                outline: "none",
              },
            }}
            {...buttonProps}
          >
            {buttonProps.children}
          </Button>
        ) : null}
      </div>
      <InputErrorHelperText>{errorMessage}</InputErrorHelperText>
    </div>
  );
};

export default Input;
