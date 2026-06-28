import { workCentersCreateSchema, workCentersListSchema, workCentersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => workCentersCreateSchema.safeParse(input),
  update: (input: unknown) => workCentersUpdateSchema.safeParse(input),
  list: (input: unknown) => workCentersListSchema.safeParse(input),
};
