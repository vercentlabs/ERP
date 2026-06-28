import { attendanceCreateSchema, attendanceListSchema, attendanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => attendanceCreateSchema.safeParse(input),
  update: (input: unknown) => attendanceUpdateSchema.safeParse(input),
  list: (input: unknown) => attendanceListSchema.safeParse(input),
};
