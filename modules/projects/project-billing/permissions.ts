export const permissions = {
  read: "projects/project-billing:read",
  create: "projects/project-billing:create",
  update: "projects/project-billing:update",
  submit: "projects/project-billing:submit",
  approve: "projects/project-billing:approve",
  reject: "projects/project-billing:reject",
  cancel: "projects/project-billing:cancel",
  close: "projects/project-billing:close",
  report: "projects/project-billing:report",
} as const;

export type ProjectBillingPermission = (typeof permissions)[keyof typeof permissions];
