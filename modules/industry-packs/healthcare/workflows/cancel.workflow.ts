export const healthcareCancelWorkflow = {
  module: "industry-packs/healthcare",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/healthcare record ${recordId}`;
  },
};
