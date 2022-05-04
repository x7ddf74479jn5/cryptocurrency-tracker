/* eslint-disable @typescript-eslint/naming-convention */
import { z } from "zod";

export const watchListSchema = z.object({
  coins: z.array(z.string()),
});

export type WatchList = z.infer<typeof watchListSchema>;
