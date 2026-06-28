import { constructionCreateSchema, constructionListSchema, constructionUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => constructionCreateSchema.safeParse(input),
  update: (input: unknown) => constructionUpdateSchema.safeParse(input),
  list: (input: unknown) => constructionListSchema.safeParse(input),
};
