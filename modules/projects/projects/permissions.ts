export const permissions = {
  read: "projects/projects:read",
  create: "projects/projects:create",
  update: "projects/projects:update",
  submit: "projects/projects:submit",
  approve: "projects/projects:approve",
  reject: "projects/projects:reject",
  cancel: "projects/projects:cancel",
  close: "projects/projects:close",
  report: "projects/projects:report",
} as const;

export type ProjectsPermission = (typeof permissions)[keyof typeof permissions];
