export const apparelCancelWorkflow = {
  module: "industry-packs/apparel",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/apparel record ${recordId}`;
  },
};
