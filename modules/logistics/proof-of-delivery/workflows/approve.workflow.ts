export const proofOfDeliveryApproveWorkflow = {
  module: "logistics/proof-of-delivery",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/proof-of-delivery record ${recordId}`;
  },
};
