export const branchesApproveWorkflow = {
  module: "platform/branches",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/branches record ${recordId}`;
  },
};
