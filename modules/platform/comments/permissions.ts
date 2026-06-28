export const permissions = {
  read: "platform/comments:read",
  create: "platform/comments:create",
  update: "platform/comments:update",
  submit: "platform/comments:submit",
  approve: "platform/comments:approve",
  reject: "platform/comments:reject",
  cancel: "platform/comments:cancel",
  close: "platform/comments:close",
  report: "platform/comments:report",
} as const;

export type CommentsPermission = (typeof permissions)[keyof typeof permissions];
