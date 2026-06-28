export const shippingCreateWorkflow = {
  module: "warehouse/shipping",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/shipping record ${recordId}`;
  },
};
