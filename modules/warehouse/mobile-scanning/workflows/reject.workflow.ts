export const mobileScanningRejectWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
