import { customer360CreateSchema, customer360ListSchema, customer360UpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customer360CreateSchema.safeParse(input),
  update: (input: unknown) => customer360UpdateSchema.safeParse(input),
  list: (input: unknown) => customer360ListSchema.safeParse(input),
};
