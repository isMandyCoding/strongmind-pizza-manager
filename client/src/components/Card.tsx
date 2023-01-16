/** @jsxImportSource theme-ui */

import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = (props: CardProps) => {
  const { children } = props;
  return (
    <div
      sx={{
        bg: "white",
        color: "black",
        borderRadius: "2px",
        boxShadow: "boxShadow",
        padding: 3,
        my: 3,
        width: ["80%"],
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
