/** @jsxImportSource theme-ui */

import { HTMLAttributes } from "react";

export interface InputErrorHelperTextProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const InputErrorHelperText = (props: InputErrorHelperTextProps) => {
  const { children } = props;
  return (
    <p
      sx={{
        color: "background",
        m: 1,
        fontSize: 1,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export default InputErrorHelperText;
