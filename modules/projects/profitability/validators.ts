import { profitabilityCreateSchema, profitabilityListSchema, profitabilityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => profitabilityCreateSchema.safeParse(input),
  update: (input: unknown) => profitabilityUpdateSchema.safeParse(input),
  list: (input: unknown) => profitabilityListSchema.safeParse(input),
};
