import { managementReportingCreateSchema, managementReportingListSchema, managementReportingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => managementReportingCreateSchema.safeParse(input),
  update: (input: unknown) => managementReportingUpdateSchema.safeParse(input),
  list: (input: unknown) => managementReportingListSchema.safeParse(input),
};
