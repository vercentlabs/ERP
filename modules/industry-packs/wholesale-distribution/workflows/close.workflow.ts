export const wholesaleDistributionCloseWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
