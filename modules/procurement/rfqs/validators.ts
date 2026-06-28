import { rfqsCreateSchema, rfqsListSchema, rfqsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => rfqsCreateSchema.safeParse(input),
  update: (input: unknown) => rfqsUpdateSchema.safeParse(input),
  list: (input: unknown) => rfqsListSchema.safeParse(input),
};
