export const customerGroupsApproveWorkflow = {
  module: "commerce/customer-groups",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/customer-groups record ${recordId}`;
  },
};
