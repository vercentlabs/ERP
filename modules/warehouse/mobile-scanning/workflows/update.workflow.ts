export const mobileScanningUpdateWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
