export const customerGroupsCloseWorkflow = {
  module: "commerce/customer-groups",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/customer-groups record ${recordId}`;
  },
};
