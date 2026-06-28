export const permissions = {
  read: "projects/milestones:read",
  create: "projects/milestones:create",
  update: "projects/milestones:update",
  submit: "projects/milestones:submit",
  approve: "projects/milestones:approve",
  reject: "projects/milestones:reject",
  cancel: "projects/milestones:cancel",
  close: "projects/milestones:close",
  report: "projects/milestones:report",
} as const;

export type MilestonesPermission = (typeof permissions)[keyof typeof permissions];
