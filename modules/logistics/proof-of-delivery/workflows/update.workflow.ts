export const proofOfDeliveryUpdateWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
