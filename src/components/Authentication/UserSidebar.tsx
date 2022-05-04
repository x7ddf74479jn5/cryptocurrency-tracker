import { Avatar, Button, Drawer } from "@mui/material";
import { styled } from "@mui/system";
import React, { useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

import { useAlertMutator } from "@/globalStates/alertState";
import { useCurrencySelector, useCurrencyState } from "@/globalStates/currencyState";
import { logout, useUserState } from "@/globalStates/userState";
import type { Coin } from "@/models";
import { useCoinList } from "@/usecases/coin";
import { useUpdateWatchList, useWatchList } from "@/usecases/watch-list";
import { numberWithCommas } from "@/utils";

const Container = styled("div")({
  width: 350,
  padding: "25px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
});

const Profile = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
});

const ProfileName = styled("span")({
  width: "100%",
  fontSize: 25,
  textAlign: "center",
  fontWeight: "bolder",
  wordWrap: "break-word",
});

const WatchList = styled("div")({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: "15px",
  paddingTop: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  overflowY: "scroll",
});

const WatchListHeading = styled("span")({
  fontSize: 20,
  textShadow: "0 0 5px black",
  fontWeight: "bold",
  borderBottom: "1px solid",
});

const CoinWrapper = styled("div")({
  padding: "10px",
  borderRadius: 5,
  color: "black",
  width: "100%",
  fontWeight: "bold",
  display: "flex",
  fontSize: "0.84rem",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
});

const CoinName = styled("span")({
  display: "flex",
  gap: "8px",
});

export const UserSidebar: React.FC = () => {
  const [drawer, setDrawer] = useState({ right: false });
  const user = useUserState();
  const setAlert = useAlertMutator();
  const currency = useCurrencyState();
  const { symbol } = useCurrencySelector();
  const { data: coins } = useCoinList(currency);

  if (!user?.uid) throw new Error("User not found");

  const { data: watchList } = useWatchList(user?.uid);

  const handleToggleDrawer = (anchor: string, open: boolean) => (_event: React.MouseEvent) => {
    if (typeof anchor !== "string") return;

    setDrawer((prev) => {
      return { ...prev, [anchor]: open };
    });
  };

  // const handleKeyboardToggleDrawer = (anchor:string, open:boolean) => (event:React.KeyboardEvent) => {
  //   if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  const handleLogOut = useCallback(async () => {
    await logout();

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful !",
    });

    // handleToggleDrawer();
  }, []);

  const handleRemoveFromWatchList = async (coin: Coin) => {
    try {
      const data = { coins: watchList?.coins.filter((wish) => wish !== coin?.id) };
      await useUpdateWatchList(user?.uid, data);

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

  const avatar = {
    src: user?.photoURL ?? undefined,
    alt: user?.displayName ?? user?.email ?? undefined,
  };

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={handleToggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              marginLeft: "15px",
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            {...avatar}
          />
          <Drawer anchor={anchor} open={drawer[anchor]} onClose={handleToggleDrawer(anchor, false)}>
            <Container>
              <Profile>
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  {...avatar}
                />
                <ProfileName>{user.displayName || user.email}</ProfileName>
                <WatchList>
                  <WatchListHeading>WatchList</WatchListHeading>
                  {coins?.map((coin) => {
                    if (watchList?.coins.includes(coin.id))
                      return (
                        <CoinWrapper key={coin.id}>
                          <span>{coin.name}</span>
                          <CoinName>
                            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => handleRemoveFromWatchList(coin)}
                            />
                          </CoinName>
                        </CoinWrapper>
                      );
                    else return null;
                  })}
                </WatchList>
              </Profile>
              <Button
                variant="contained"
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
