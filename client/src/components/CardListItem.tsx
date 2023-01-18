/** @jsxImportSource theme-ui */
import { LiHTMLAttributes } from "react";
import { ThemeUIStyleObject } from "theme-ui";

export interface CardListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  sx?: ThemeUIStyleObject;
}

const CardListItem = (props: CardListItemProps) => {
  const { children, sx } = props;
  return (
    <li
      sx={{
        variant: "flex.row",
        flexDirection: ["column", null, "row"],
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      {children}
    </li>
  );
};

export default CardListItem;
