export const shippingCloseWorkflow = {
  module: "warehouse/shipping",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/shipping record ${recordId}`;
  },
};
