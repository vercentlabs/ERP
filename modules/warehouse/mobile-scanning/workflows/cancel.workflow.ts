export const mobileScanningCancelWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
