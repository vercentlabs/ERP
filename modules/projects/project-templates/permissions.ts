export const permissions = {
  read: "projects/project-templates:read",
  create: "projects/project-templates:create",
  update: "projects/project-templates:update",
  submit: "projects/project-templates:submit",
  approve: "projects/project-templates:approve",
  reject: "projects/project-templates:reject",
  cancel: "projects/project-templates:cancel",
  close: "projects/project-templates:close",
  report: "projects/project-templates:report",
} as const;

export type ProjectTemplatesPermission = (typeof permissions)[keyof typeof permissions];
