import { wholesaleDistributionCreateSchema, wholesaleDistributionListSchema, wholesaleDistributionUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => wholesaleDistributionCreateSchema.safeParse(input),
  update: (input: unknown) => wholesaleDistributionUpdateSchema.safeParse(input),
  list: (input: unknown) => wholesaleDistributionListSchema.safeParse(input),
};
