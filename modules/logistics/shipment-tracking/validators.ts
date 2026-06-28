import { shipmentTrackingCreateSchema, shipmentTrackingListSchema, shipmentTrackingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => shipmentTrackingCreateSchema.safeParse(input),
  update: (input: unknown) => shipmentTrackingUpdateSchema.safeParse(input),
  list: (input: unknown) => shipmentTrackingListSchema.safeParse(input),
};
