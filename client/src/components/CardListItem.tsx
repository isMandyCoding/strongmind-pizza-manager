/** @jsxImportSource theme-ui */
import { LiHTMLAttributes } from "react";
import { SxProp, ThemeUIStyleObject } from "theme-ui";

export type CardListItemProps = LiHTMLAttributes<HTMLLIElement> & SxProp & {};

const CardListItem = (props: CardListItemProps) => {
  const { children, className } = props;
  return (
    <li
      className={className}
      sx={{
        variant: "flex.row",
        flexDirection: ["column", null, "row"],
        width: "100%",
      }}
      {...props}
    >
      {children}
    </li>
  );
};

export default CardListItem;
