import { scenarioModelingCreateSchema, scenarioModelingListSchema, scenarioModelingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => scenarioModelingCreateSchema.safeParse(input),
  update: (input: unknown) => scenarioModelingUpdateSchema.safeParse(input),
  list: (input: unknown) => scenarioModelingListSchema.safeParse(input),
};
