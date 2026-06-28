import { milestonesCreateSchema, milestonesListSchema, milestonesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => milestonesCreateSchema.safeParse(input),
  update: (input: unknown) => milestonesUpdateSchema.safeParse(input),
  list: (input: unknown) => milestonesListSchema.safeParse(input),
};
