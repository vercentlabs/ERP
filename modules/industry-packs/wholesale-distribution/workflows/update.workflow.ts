export const wholesaleDistributionUpdateWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
