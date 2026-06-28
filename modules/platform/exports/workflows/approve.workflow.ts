export const exportsApproveWorkflow = {
  module: "platform/exports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/exports record ${recordId}`;
  },
};
