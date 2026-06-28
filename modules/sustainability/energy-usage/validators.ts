import { energyUsageCreateSchema, energyUsageListSchema, energyUsageUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => energyUsageCreateSchema.safeParse(input),
  update: (input: unknown) => energyUsageUpdateSchema.safeParse(input),
  list: (input: unknown) => energyUsageListSchema.safeParse(input),
};
