import { riskRegisterCreateSchema, riskRegisterListSchema, riskRegisterUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => riskRegisterCreateSchema.safeParse(input),
  update: (input: unknown) => riskRegisterUpdateSchema.safeParse(input),
  list: (input: unknown) => riskRegisterListSchema.safeParse(input),
};
