export const customerGroupsCreateWorkflow = {
  module: "commerce/customer-groups",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/customer-groups record ${recordId}`;
  },
};
