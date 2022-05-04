import {
  Container,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrencySelector, useCurrencyState } from "@/globalStates/currencyState";
import { useCoinList } from "@/usecases/coin";
import { numberWithCommas } from "@/utils";

const Coin = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Symbol = styled("span")({
  textTransform: "uppercase",
  fontSize: 22,
});

const CoinName = styled("span")({
  color: "darkgrey",
});

const CoinImage = styled("img")({
  marginBottom: "10px",
});

export const CoinsTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const currency = useCurrencyState();
  const { symbol } = useCurrencySelector();
  const { data: coins } = useCoinList(currency);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredCoins = useMemo(() => {
    return coins?.filter(
      (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  }, [coins, search]);

  const handleNavigate = useCallback((row: string) => {
    navigate(`/coins/${row}`);
  }, []);

  const handlePaginate = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scroll(0, 450);
  }, []);

  const count = filteredCoins?.length ? parseInt((filteredCoins?.length / 10).toFixed(0)) : 1;

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ margin: "18px", fontFamily: "Montserrat", fontWeight: "bold", padding: "1rem" /* color: 'gold' */ }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        sx={{ marginBottom: "20px", width: "100%" }}
        onChange={handleChangeSearch}
      />
      <TableContainer component={Paper}>
        {!coins ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : (
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "1.15rem",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCoins?.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                const isProfit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => handleNavigate(row.id)}
                    sx={{
                      backgroundColor: "#16171a",
                      cursor: "pointer",
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      "&:hover": {
                        backgroundColor: "#131111",
                      },
                      fontFamily: "Montserrat",
                    }}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <CoinImage src={row?.image} alt={row.name} height="50" />
                      <Coin>
                        <Symbol>{row.symbol}</Symbol>
                        <CoinName>{row.name}</CoinName>
                      </Coin>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: isProfit ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {isProfit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination
        count={count}
        sx={{
          ui: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          },
          padding: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={handlePaginate}
      />
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default CoinsTable;
