export const assetsApproveWorkflow = {
  module: "maintenance/assets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/assets record ${recordId}`;
  },
};
