export const permissions = {
  read: "platform/workflow-approvals:read",
  create: "platform/workflow-approvals:create",
  update: "platform/workflow-approvals:update",
  submit: "platform/workflow-approvals:submit",
  approve: "platform/workflow-approvals:approve",
  reject: "platform/workflow-approvals:reject",
  cancel: "platform/workflow-approvals:cancel",
  close: "platform/workflow-approvals:close",
  report: "platform/workflow-approvals:report",
} as const;

export type WorkflowApprovalsPermission = (typeof permissions)[keyof typeof permissions];
