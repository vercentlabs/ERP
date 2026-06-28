export const workflowApprovalsSubmitWorkflow = {
  module: "platform/workflow-approvals",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/workflow-approvals record ${recordId}`;
  },
};
