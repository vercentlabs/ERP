export const customerPortalRejectWorkflow = {
  module: "helpdesk/customer-portal",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
