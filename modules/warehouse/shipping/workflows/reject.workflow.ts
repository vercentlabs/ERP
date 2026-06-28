export const shippingRejectWorkflow = {
  module: "warehouse/shipping",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/shipping record ${recordId}`;
  },
};
