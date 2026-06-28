import { productionOrdersCreateSchema, productionOrdersListSchema, productionOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => productionOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => productionOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => productionOrdersListSchema.safeParse(input),
};
