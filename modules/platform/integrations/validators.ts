import { integrationsCreateSchema, integrationsListSchema, integrationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => integrationsCreateSchema.safeParse(input),
  update: (input: unknown) => integrationsUpdateSchema.safeParse(input),
  list: (input: unknown) => integrationsListSchema.safeParse(input),
};
