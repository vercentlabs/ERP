export const customWorkflowsApproveWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
