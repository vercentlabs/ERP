import { slasCreateSchema, slasListSchema, slasUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => slasCreateSchema.safeParse(input),
  update: (input: unknown) => slasUpdateSchema.safeParse(input),
  list: (input: unknown) => slasListSchema.safeParse(input),
};
