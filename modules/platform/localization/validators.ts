import { localizationCreateSchema, localizationListSchema, localizationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationCreateSchema.safeParse(input),
  update: (input: unknown) => localizationUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationListSchema.safeParse(input),
};
