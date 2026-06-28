import { proofOfDeliveryCreateSchema, proofOfDeliveryListSchema, proofOfDeliveryUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => proofOfDeliveryCreateSchema.safeParse(input),
  update: (input: unknown) => proofOfDeliveryUpdateSchema.safeParse(input),
  list: (input: unknown) => proofOfDeliveryListSchema.safeParse(input),
};
