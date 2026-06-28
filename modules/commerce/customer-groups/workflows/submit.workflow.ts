export const customerGroupsSubmitWorkflow = {
  module: "commerce/customer-groups",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/customer-groups record ${recordId}`;
  },
};
