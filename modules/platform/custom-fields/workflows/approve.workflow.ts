export const customFieldsApproveWorkflow = {
  module: "platform/custom-fields",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/custom-fields record ${recordId}`;
  },
};
