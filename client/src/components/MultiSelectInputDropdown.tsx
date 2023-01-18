/** @jsxImportSource theme-ui */

import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface MultiSelectInputDropdownProps
  extends HTMLAttributes<HTMLDivElement> {}

const MultiSelectInputDropdown = (props: MultiSelectInputDropdownProps) => {
  const { id } = props;

  return <div {...props}></div>;
};

export default MultiSelectInputDropdown;
