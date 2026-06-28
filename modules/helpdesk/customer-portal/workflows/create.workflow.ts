export const customerPortalCreateWorkflow = {
  module: "helpdesk/customer-portal",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
