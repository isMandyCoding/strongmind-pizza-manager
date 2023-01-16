/** @jsxImportSource theme-ui */

import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  const { children } = props;
  return <button {...props}>{children}</button>;
};

export default Button;
