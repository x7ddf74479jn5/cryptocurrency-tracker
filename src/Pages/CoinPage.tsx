import { Button, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";

import { CoinInfo } from "@/components/CoinInfo";
import { useAlertMutator } from "@/globalStates/alertState";
import { useCurrencySelector, useCurrencyState } from "@/globalStates/currencyState";
import { useUserState } from "@/globalStates/userState";
import { useSingleCoin } from "@/usecases/coin";
import { useUpdateWatchList, useWatchList } from "@/usecases/watch-list";
import { numberWithCommas } from "@/utils";

const Flex = styled("span")({
  display: "flex",
});

const Image = styled("img")({
  backgroundColor: "gold",
});

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  borderRight: "2px solid grey",
}));

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: "25px",
  paddingTop: "10px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const Heading = styled(Typography)({ fontWeight: "bold", marginBottom: "20px", fontFamily: "Montserrat" });

const GoldTypography = styled(Typography)({ fontFamily: "Montserrat", color: "gold" });

const CoinPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("No coin id provided");

  const { symbol } = useCurrencySelector();
  const currency = useCurrencyState();
  const { data: coin } = useSingleCoin(id);
  const setAlert = useAlertMutator();

  const user = useUserState();
  const { data: watchList } = useWatchList(user?.uid);
  const coins = watchList?.coins || [];

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />; //loading to process & avoid error

  const handleAddToWatchList = async () => {
    try {
      const data = { coins: [...coins, coin?.id] };
      await useUpdateWatchList(user?.uid || "", data);

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watch List !`,
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  const isInWatchList = watchList?.coins.includes(coin?.id); //styling boolean decision

  const handleRemoveFromWatchList = async () => {
    try {
      const data = { coins: coins.filter((wish) => wish !== coin?.id) };
      await useUpdateWatchList(user?.uid || "", data);

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watch List !`,
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  const handleClick = () => {
    isInWatchList ? handleRemoveFromWatchList() : handleAddToWatchList();
  };

  return (
    <Container>
      <Sidebar>
        <Image src={coin?.image.large} alt={coin?.name} height="200" />
        <Heading variant="h3">{coin?.name}</Heading>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: "25px",
            paddingBottom: "15px",
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
          <span dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] + "." }} />
        </Typography>
        <MarketData>
          <Flex>
            <Heading variant="h5">Rank:</Heading>
            &nbsp; &nbsp;
            <GoldTypography variant="h5">{numberWithCommas(coin?.market_cap_rank)}</GoldTypography>
          </Flex>

          <Flex>
            <Heading variant="h5">Current Price:</Heading>
            &nbsp; &nbsp;
            <GoldTypography variant="h5">
              {symbol} {numberWithCommas(coin?.market_data.current_price[currency])}
            </GoldTypography>
          </Flex>
          <Flex>
            <Heading variant="h5">Market Cap:</Heading>
            &nbsp; &nbsp;
            <GoldTypography variant="h5">
              {symbol} {numberWithCommas(coin?.market_data.market_cap[currency].toString().slice(0, -6))}M
            </GoldTypography>
          </Flex>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: isInWatchList ? "#DF2E2E" : "#EEBC1D",
                fontWeight: "bold",
              }}
              onClick={handleClick}
            >
              {isInWatchList ? "Remove from Watch List" : "Add to Watch List"}
            </Button>
          )}
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
