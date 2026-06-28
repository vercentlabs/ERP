export const permissions = {
  read: "projects/programs:read",
  create: "projects/programs:create",
  update: "projects/programs:update",
  submit: "projects/programs:submit",
  approve: "projects/programs:approve",
  reject: "projects/programs:reject",
  cancel: "projects/programs:cancel",
  close: "projects/programs:close",
  report: "projects/programs:report",
} as const;

export type ProgramsPermission = (typeof permissions)[keyof typeof permissions];
