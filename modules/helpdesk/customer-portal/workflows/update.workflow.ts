export const customerPortalUpdateWorkflow = {
  module: "helpdesk/customer-portal",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
