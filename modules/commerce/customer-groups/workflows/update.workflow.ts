export const customerGroupsUpdateWorkflow = {
  module: "commerce/customer-groups",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/customer-groups record ${recordId}`;
  },
};
