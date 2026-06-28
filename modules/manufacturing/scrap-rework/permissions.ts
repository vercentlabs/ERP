export const permissions = {
  read: "manufacturing/scrap-rework:read",
  create: "manufacturing/scrap-rework:create",
  update: "manufacturing/scrap-rework:update",
  submit: "manufacturing/scrap-rework:submit",
  approve: "manufacturing/scrap-rework:approve",
  reject: "manufacturing/scrap-rework:reject",
  cancel: "manufacturing/scrap-rework:cancel",
  close: "manufacturing/scrap-rework:close",
  report: "manufacturing/scrap-rework:report",
} as const;

export type ScrapReworkPermission = (typeof permissions)[keyof typeof permissions];
