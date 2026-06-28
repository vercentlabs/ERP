export const permissions = {
  read: "ai/workflow-recommendations:read",
  create: "ai/workflow-recommendations:create",
  update: "ai/workflow-recommendations:update",
  submit: "ai/workflow-recommendations:submit",
  approve: "ai/workflow-recommendations:approve",
  reject: "ai/workflow-recommendations:reject",
  cancel: "ai/workflow-recommendations:cancel",
  close: "ai/workflow-recommendations:close",
  report: "ai/workflow-recommendations:report",
} as const;

export type WorkflowRecommendationsPermission = (typeof permissions)[keyof typeof permissions];
