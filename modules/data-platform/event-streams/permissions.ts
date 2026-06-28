export const permissions = {
  read: "data-platform/event-streams:read",
  create: "data-platform/event-streams:create",
  update: "data-platform/event-streams:update",
  submit: "data-platform/event-streams:submit",
  approve: "data-platform/event-streams:approve",
  reject: "data-platform/event-streams:reject",
  cancel: "data-platform/event-streams:cancel",
  close: "data-platform/event-streams:close",
  report: "data-platform/event-streams:report",
} as const;

export type EventStreamsPermission = (typeof permissions)[keyof typeof permissions];
