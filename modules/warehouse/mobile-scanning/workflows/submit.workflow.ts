export const mobileScanningSubmitWorkflow = {
  module: "warehouse/mobile-scanning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/mobile-scanning record ${recordId}`;
  },
};
