export const proofOfDeliveryCreateWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
