/** @jsxImportSource theme-ui */

export interface CardHeaderProps {
  text: string;
}

const CardHeader = ({ text }: CardHeaderProps) => {
  return (
    <>
      <h3
        sx={{
          textAlign: "center",
          fontSize: 4,
        }}
      >
        {text}
      </h3>
      <div
        sx={{
          variant: "styles.hr",
        }}
      ></div>
    </>
  );
};

export default CardHeader;
