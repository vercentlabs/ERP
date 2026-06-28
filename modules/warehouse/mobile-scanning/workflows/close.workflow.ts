export const mobileScanningCloseWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
