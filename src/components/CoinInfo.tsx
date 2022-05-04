import { CircularProgress, styled } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { useCallback, useState } from "react";
import { Line } from "react-chartjs-2";

import { chartDays } from "@/config/data";
import { useCurrencySelector } from "@/globalStates/currencyState";
import type { SingleCoin } from "@/models";
import { useHistoricalChart } from "@/usecases/coin";

import { SelectButton } from "./SelectButton";

Chart.register(...registerables);

const Container = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "25px",
  padding: "40px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: "20px",
    paddingTop: 0,
  },
}));

const DaysWrapper = styled("div")({
  display: "flex",
  marginTop: "20px",
  justifyContent: "space-around",
  width: "100%",
});

type CoinInfoProps = {
  coin: SingleCoin;
};

export const CoinInfo: React.FC<CoinInfoProps> = ({ coin }) => {
  const { currency } = useCurrencySelector();
  const [days, setDays] = useState(1);
  const { data: historicData } = useHistoricalChart(coin.id, currency, days);
  const historicPrices = historicData?.prices;

  const handleSelectDays = useCallback((days: number) => {
    setDays(days);
  }, []);

  return (
    <Container>
      {!historicData ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: historicPrices?.map((coin) => {
                const date = new Date(coin[0]);
                const time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicPrices?.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <DaysWrapper>
            {chartDays.map((day) => (
              <SelectButton key={day.value} onClick={() => handleSelectDays(day.value)} selected={day.value === days}>
                {day.label}
              </SelectButton>
            ))}
          </DaysWrapper>
        </>
      )}
    </Container>
  );
};
