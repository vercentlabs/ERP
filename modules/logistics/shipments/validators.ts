import { shipmentsCreateSchema, shipmentsListSchema, shipmentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => shipmentsCreateSchema.safeParse(input),
  update: (input: unknown) => shipmentsUpdateSchema.safeParse(input),
  list: (input: unknown) => shipmentsListSchema.safeParse(input),
};
