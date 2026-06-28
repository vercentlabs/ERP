export const proofOfDeliveryCloseWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
