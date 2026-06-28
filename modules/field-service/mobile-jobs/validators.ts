import { mobileJobsCreateSchema, mobileJobsListSchema, mobileJobsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => mobileJobsCreateSchema.safeParse(input),
  update: (input: unknown) => mobileJobsUpdateSchema.safeParse(input),
  list: (input: unknown) => mobileJobsListSchema.safeParse(input),
};
