export const importsApproveWorkflow = {
  module: "platform/imports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/imports record ${recordId}`;
  },
};
