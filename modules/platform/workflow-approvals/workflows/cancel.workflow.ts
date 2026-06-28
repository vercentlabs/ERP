export const workflowApprovalsCancelWorkflow = {
  module: "platform/workflow-approvals",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/workflow-approvals record ${recordId}`;
  },
};
