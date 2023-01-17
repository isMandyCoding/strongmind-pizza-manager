/** @jsxImportSource theme-ui */

import { ButtonHTMLAttributes } from "react";
import { useThemeUI } from "theme-ui";
// import { PizzaTheme } from "../theme";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "background" | "primary" | "secondary" | "danger";
  variant?: "buttons.primary";
}

const Button = (props: ButtonProps) => {
  const { children, color, variant } = props;
  const { theme } = useThemeUI();

  const borderProp = color
    ? `1px solid ${theme.colors ? theme.colors[color] : "inherit"}`
    : `1px solid ${theme.colors?.primary}`;
  return (
    <button
      sx={{
        variant: variant ?? "buttons.outlined",
        color: color ?? "primary",
        border: borderProp,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
