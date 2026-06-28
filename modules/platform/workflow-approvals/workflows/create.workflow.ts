export const workflowApprovalsCreateWorkflow = {
  module: "platform/workflow-approvals",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/workflow-approvals record ${recordId}`;
  },
};
