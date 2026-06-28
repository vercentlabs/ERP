export const wholesaleDistributionCancelWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
