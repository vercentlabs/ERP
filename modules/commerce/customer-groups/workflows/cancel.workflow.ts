export const customerGroupsCancelWorkflow = {
  module: "commerce/customer-groups",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/customer-groups record ${recordId}`;
  },
};
