export const permissions = {
  read: "hr/recruitment:read",
  create: "hr/recruitment:create",
  update: "hr/recruitment:update",
  submit: "hr/recruitment:submit",
  approve: "hr/recruitment:approve",
  reject: "hr/recruitment:reject",
  cancel: "hr/recruitment:cancel",
  close: "hr/recruitment:close",
  report: "hr/recruitment:report",
} as const;

export type RecruitmentPermission = (typeof permissions)[keyof typeof permissions];
