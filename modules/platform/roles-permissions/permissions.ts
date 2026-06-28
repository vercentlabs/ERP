export const permissions = {
  read: "platform/roles-permissions:read",
  create: "platform/roles-permissions:create",
  update: "platform/roles-permissions:update",
  submit: "platform/roles-permissions:submit",
  approve: "platform/roles-permissions:approve",
  reject: "platform/roles-permissions:reject",
  cancel: "platform/roles-permissions:cancel",
  close: "platform/roles-permissions:close",
  report: "platform/roles-permissions:report",
} as const;

export type RolesPermissionsPermission = (typeof permissions)[keyof typeof permissions];
