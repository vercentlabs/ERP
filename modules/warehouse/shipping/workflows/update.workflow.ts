export const shippingUpdateWorkflow = {
  module: "warehouse/shipping",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/shipping record ${recordId}`;
  },
};
