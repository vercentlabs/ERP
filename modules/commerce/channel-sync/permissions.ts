export const permissions = {
  read: "commerce/channel-sync:read",
  create: "commerce/channel-sync:create",
  update: "commerce/channel-sync:update",
  submit: "commerce/channel-sync:submit",
  approve: "commerce/channel-sync:approve",
  reject: "commerce/channel-sync:reject",
  cancel: "commerce/channel-sync:cancel",
  close: "commerce/channel-sync:close",
  report: "commerce/channel-sync:report",
} as const;

export type ChannelSyncPermission = (typeof permissions)[keyof typeof permissions];
