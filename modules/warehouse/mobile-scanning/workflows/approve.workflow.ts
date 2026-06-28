export const mobileScanningApproveWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
