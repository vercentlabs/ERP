export const customer360CancelWorkflow = {
  module: "crm/customer-360",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/customer-360 record ${recordId}`;
  },
};
