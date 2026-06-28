export const mobileScanningCreateWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
