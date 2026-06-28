import { softwareSaasCreateSchema, softwareSaasListSchema, softwareSaasUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => softwareSaasCreateSchema.safeParse(input),
  update: (input: unknown) => softwareSaasUpdateSchema.safeParse(input),
  list: (input: unknown) => softwareSaasListSchema.safeParse(input),
};
