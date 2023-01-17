/** @jsxImportSource theme-ui */
import { LiHTMLAttributes } from "react";

export interface CardListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

const CardListItem = (props: CardListItemProps) => {
  const { children } = props;
  return (
    <li
      sx={{
        variant: "flex.row",
        flexDirection: ["column", "row"],
        width: "100%",
      }}
      {...props}
    >
      {children}
    </li>
  );
};

export default CardListItem;
