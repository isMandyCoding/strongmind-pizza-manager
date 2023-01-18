/** @jsxImportSource theme-ui */

import { InputHTMLAttributes } from "react";
import MultiSelectInputDropdown from "./MultiSelectInputDropdown";

export interface MultiSelectInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { name, id } = props;

  return (
    <div>
      <input type="text" name={name} id={id} />
      <MultiSelectInputDropdown />
    </div>
  );
};

export default MultiSelectInput;
