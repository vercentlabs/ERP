import { mobileScanningCreateSchema, mobileScanningListSchema, mobileScanningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => mobileScanningCreateSchema.safeParse(input),
  update: (input: unknown) => mobileScanningUpdateSchema.safeParse(input),
  list: (input: unknown) => mobileScanningListSchema.safeParse(input),
};
