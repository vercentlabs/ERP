import { operationalDataStoreCreateSchema, operationalDataStoreListSchema, operationalDataStoreUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => operationalDataStoreCreateSchema.safeParse(input),
  update: (input: unknown) => operationalDataStoreUpdateSchema.safeParse(input),
  list: (input: unknown) => operationalDataStoreListSchema.safeParse(input),
};
