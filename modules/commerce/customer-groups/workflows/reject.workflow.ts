export const customerGroupsRejectWorkflow = {
  module: "commerce/customer-groups",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/customer-groups record ${recordId}`;
  },
};
