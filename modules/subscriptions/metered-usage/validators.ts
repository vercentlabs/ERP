import { meteredUsageCreateSchema, meteredUsageListSchema, meteredUsageUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => meteredUsageCreateSchema.safeParse(input),
  update: (input: unknown) => meteredUsageUpdateSchema.safeParse(input),
  list: (input: unknown) => meteredUsageListSchema.safeParse(input),
};
