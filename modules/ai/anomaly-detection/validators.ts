import { anomalyDetectionCreateSchema, anomalyDetectionListSchema, anomalyDetectionUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => anomalyDetectionCreateSchema.safeParse(input),
  update: (input: unknown) => anomalyDetectionUpdateSchema.safeParse(input),
  list: (input: unknown) => anomalyDetectionListSchema.safeParse(input),
};
