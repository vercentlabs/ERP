export const proofOfDeliverySubmitWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
