export const shippingApproveWorkflow = {
  module: "warehouse/shipping",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/shipping record ${recordId}`;
  },
};
