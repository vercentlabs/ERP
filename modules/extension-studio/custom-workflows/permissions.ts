export const permissions = {
  read: "extension-studio/custom-workflows:read",
  create: "extension-studio/custom-workflows:create",
  update: "extension-studio/custom-workflows:update",
  submit: "extension-studio/custom-workflows:submit",
  approve: "extension-studio/custom-workflows:approve",
  reject: "extension-studio/custom-workflows:reject",
  cancel: "extension-studio/custom-workflows:cancel",
  close: "extension-studio/custom-workflows:close",
  report: "extension-studio/custom-workflows:report",
} as const;

export type CustomWorkflowsPermission = (typeof permissions)[keyof typeof permissions];
