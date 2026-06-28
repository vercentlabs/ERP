export const customObjectsApproveWorkflow = {
  module: "extension-studio/custom-objects",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
