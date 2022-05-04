import ky from "ky";

export const client = ky.extend({
  prefixUrl: "https://api.coingecko.com/api/v3/coins/",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});
