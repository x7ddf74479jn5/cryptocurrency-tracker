import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { Carousel } from "./Carousel";

const BannerContainer = styled("div")({
  backgroundImage: "url(./banner.jpg)",
});

const BannerContent = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: "25px",
  justifyContent: "space-around",
});

const Tagline = styled("div")({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

export const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel />
      </BannerContent>
    </BannerContainer>
  );
};
