import { onboardingCreateSchema, onboardingListSchema, onboardingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => onboardingCreateSchema.safeParse(input),
  update: (input: unknown) => onboardingUpdateSchema.safeParse(input),
  list: (input: unknown) => onboardingListSchema.safeParse(input),
};
