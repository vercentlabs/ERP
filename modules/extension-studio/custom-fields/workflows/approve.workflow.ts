export const customFieldsApproveWorkflow = {
  module: "extension-studio/custom-fields",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
