export const shippingSubmitWorkflow = {
  module: "warehouse/shipping",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/shipping record ${recordId}`;
  },
};
