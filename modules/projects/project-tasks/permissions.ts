export const permissions = {
  read: "projects/project-tasks:read",
  create: "projects/project-tasks:create",
  update: "projects/project-tasks:update",
  submit: "projects/project-tasks:submit",
  approve: "projects/project-tasks:approve",
  reject: "projects/project-tasks:reject",
  cancel: "projects/project-tasks:cancel",
  close: "projects/project-tasks:close",
  report: "projects/project-tasks:report",
} as const;

export type ProjectTasksPermission = (typeof permissions)[keyof typeof permissions];
