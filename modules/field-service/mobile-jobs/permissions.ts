export const permissions = {
  read: "field-service/mobile-jobs:read",
  create: "field-service/mobile-jobs:create",
  update: "field-service/mobile-jobs:update",
  submit: "field-service/mobile-jobs:submit",
  approve: "field-service/mobile-jobs:approve",
  reject: "field-service/mobile-jobs:reject",
  cancel: "field-service/mobile-jobs:cancel",
  close: "field-service/mobile-jobs:close",
  report: "field-service/mobile-jobs:report",
} as const;

export type MobileJobsPermission = (typeof permissions)[keyof typeof permissions];
