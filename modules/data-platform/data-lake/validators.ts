import { dataLakeCreateSchema, dataLakeListSchema, dataLakeUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataLakeCreateSchema.safeParse(input),
  update: (input: unknown) => dataLakeUpdateSchema.safeParse(input),
  list: (input: unknown) => dataLakeListSchema.safeParse(input),
};
