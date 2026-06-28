export const wholesaleDistributionSubmitWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
