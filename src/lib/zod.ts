import type { z } from "zod";

// construct a schema by external type definition
export type ToZod<T extends Record<string, any>> = {
  [K in keyof T]-?: z.ZodType<T[K]>;
};
