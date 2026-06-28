export const documentsApproveWorkflow = {
  module: "platform/documents",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/documents record ${recordId}`;
  },
};
