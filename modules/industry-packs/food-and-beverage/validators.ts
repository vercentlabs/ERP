import { foodAndBeverageCreateSchema, foodAndBeverageListSchema, foodAndBeverageUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => foodAndBeverageCreateSchema.safeParse(input),
  update: (input: unknown) => foodAndBeverageUpdateSchema.safeParse(input),
  list: (input: unknown) => foodAndBeverageListSchema.safeParse(input),
};
