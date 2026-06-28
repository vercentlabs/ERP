import { reportBuilderCreateSchema, reportBuilderListSchema, reportBuilderUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => reportBuilderCreateSchema.safeParse(input),
  update: (input: unknown) => reportBuilderUpdateSchema.safeParse(input),
  list: (input: unknown) => reportBuilderListSchema.safeParse(input),
};
