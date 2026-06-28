export const permissions = {
  read: "extension-studio/scripting:read",
  create: "extension-studio/scripting:create",
  update: "extension-studio/scripting:update",
  submit: "extension-studio/scripting:submit",
  approve: "extension-studio/scripting:approve",
  reject: "extension-studio/scripting:reject",
  cancel: "extension-studio/scripting:cancel",
  close: "extension-studio/scripting:close",
  report: "extension-studio/scripting:report",
} as const;

export type ScriptingPermission = (typeof permissions)[keyof typeof permissions];
