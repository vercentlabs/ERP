import { salaryStructuresCreateSchema, salaryStructuresListSchema, salaryStructuresUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => salaryStructuresCreateSchema.safeParse(input),
  update: (input: unknown) => salaryStructuresUpdateSchema.safeParse(input),
  list: (input: unknown) => salaryStructuresListSchema.safeParse(input),
};
