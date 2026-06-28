import { appBuilderCreateSchema, appBuilderListSchema, appBuilderUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => appBuilderCreateSchema.safeParse(input),
  update: (input: unknown) => appBuilderUpdateSchema.safeParse(input),
  list: (input: unknown) => appBuilderListSchema.safeParse(input),
};
