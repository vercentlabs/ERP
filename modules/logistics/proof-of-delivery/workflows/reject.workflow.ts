export const proofOfDeliveryRejectWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
