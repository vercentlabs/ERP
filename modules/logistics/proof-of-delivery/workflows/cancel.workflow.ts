export const proofOfDeliveryCancelWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
