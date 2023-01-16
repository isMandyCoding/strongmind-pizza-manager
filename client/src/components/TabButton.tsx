/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes } from "react";

export interface TabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const TabButton = (props: TabButtonProps) => {
  const { children, selected } = props;
  return (
    <button
      sx={{
        variant: selected ? "buttons.tabButton.selected" : "buttons.tabButton",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabButton;
