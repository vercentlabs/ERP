import { serviceWorkOrdersCreateSchema, serviceWorkOrdersListSchema, serviceWorkOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => serviceWorkOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => serviceWorkOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => serviceWorkOrdersListSchema.safeParse(input),
};
