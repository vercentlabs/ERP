export const workflowApprovalsApproveWorkflow = {
  module: "platform/workflow-approvals",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/workflow-approvals record ${recordId}`;
  },
};
