export const workflowApprovalsCloseWorkflow = {
  module: "platform/workflow-approvals",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/workflow-approvals record ${recordId}`;
  },
};
