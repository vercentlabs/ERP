export const shippingCancelWorkflow = {
  module: "warehouse/shipping",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/shipping record ${recordId}`;
  },
};
