/** @jsxImportSource theme-ui */
import { OlHTMLAttributes } from "react";

export interface CardListProps extends OlHTMLAttributes<HTMLUListElement> {}

const CardList = (props: CardListProps) => {
  const { children } = props;
  return (
    <ul
      sx={{
        variant: "flex.column",
        px: 4,
      }}
      {...props}
    >
      {children}
    </ul>
  );
};

export default CardList;
