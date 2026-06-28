export const customLayoutsApproveWorkflow = {
  module: "platform/custom-layouts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/custom-layouts record ${recordId}`;
  },
};
