export const workflowApprovalsRejectWorkflow = {
  module: "platform/workflow-approvals",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/workflow-approvals record ${recordId}`;
  },
};
