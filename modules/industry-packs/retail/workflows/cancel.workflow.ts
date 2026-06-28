export const retailCancelWorkflow = {
  module: "industry-packs/retail",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/retail record ${recordId}`;
  },
};
