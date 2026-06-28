import { timesheetsCreateSchema, timesheetsListSchema, timesheetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => timesheetsCreateSchema.safeParse(input),
  update: (input: unknown) => timesheetsUpdateSchema.safeParse(input),
  list: (input: unknown) => timesheetsListSchema.safeParse(input),
};
