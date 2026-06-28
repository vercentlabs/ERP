import { scrapReworkCreateSchema, scrapReworkListSchema, scrapReworkUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => scrapReworkCreateSchema.safeParse(input),
  update: (input: unknown) => scrapReworkUpdateSchema.safeParse(input),
  list: (input: unknown) => scrapReworkListSchema.safeParse(input),
};
