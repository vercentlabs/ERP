export const customersCancelWorkflow = {
  module: "crm/customers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/customers record ${recordId}`;
  },
};
