export const workflowApprovalsUpdateWorkflow = {
  module: "platform/workflow-approvals",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/workflow-approvals record ${recordId}`;
  },
};
