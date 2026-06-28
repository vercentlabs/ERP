export const customWorkflowsRejectWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
