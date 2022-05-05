/* eslint-disable @typescript-eslint/naming-convention */
import "@splidejs/react-splide/css";

import styled from "@emotion/styled";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";

import { useCurrencySelector } from "@/globalStates/currencyState";
import { useTrendingCoins } from "@/usecases/coin";
import { numberWithCommas } from "@/utils";

const CarouselContainer = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const CarouselItem = styled(Link)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  paddingLeftL: "2rem",
  paddingRightL: "2rem",
});

const CoinImage = styled("img")({
  marginBottom: "10px",
});

const CurrentPrice = styled("span")({
  fontSize: 22,
  fontWeight: 500,
});

const Profit = styled("span")<{ isProfit: boolean }>((props) => ({
  color: props.isProfit ? "rgb(14, 203, 129)" : "red",
  fontWeight: 500,
}));

export const Carousel: React.FC = () => {
  const { currency, symbol } = useCurrencySelector();
  const { data: trendingCoins } = useTrendingCoins(currency);

  if (trendingCoins === undefined) {
    // suspense mode always returns response of fetcher
    throw new Error("trendingCoins is undefined");
  }

  const items = trendingCoins.map((coin) => {
    const isProfit = coin?.price_change_percentage_24h >= 0;

    return (
      <SplideSlide style={{ padding: "0 4 4 0" }} key={coin.id}>
        <CarouselItem to={`/coins/${coin.id}`}>
          <CoinImage src={coin?.image} alt={coin.name} height="80" />
          <span>
            {coin?.symbol}
            &nbsp;
            <Profit isProfit>
              {isProfit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </Profit>
          </span>
          <CurrentPrice>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </CurrentPrice>
        </CarouselItem>
      </SplideSlide>
    );
  });

  return (
    <CarouselContainer>
      <Splide
        options={{
          type: "loop",
          rewind: true,
          autoplay: true,
          interval: 5000,
          speed: 5000,
          rewindSpeed: 5000,
          arrows: false,
          pagination: false,
          perPage: 4,
          breakpoints: {
            512: {
              perPage: 2,
            },
          },
          height: "100%",
          width: "100%",
        }}
      >
        {items}
      </Splide>
    </CarouselContainer>
  );
};
