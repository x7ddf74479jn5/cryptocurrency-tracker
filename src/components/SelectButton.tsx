import { styled } from "@mui/system";

type SelectButtonProps = {
  selected: boolean;
  onClick: () => void;
};

export const SelectButton: React.FC<React.PropsWithChildren<SelectButtonProps>> = ({
  children,
  selected,
  onClick: handleClick,
}) => {
  const Container = styled("span")({
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  });

  return <Container onClick={handleClick}>{children}</Container>;
};
