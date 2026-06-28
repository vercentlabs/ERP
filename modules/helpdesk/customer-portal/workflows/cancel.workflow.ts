export const customerPortalCancelWorkflow = {
  module: "helpdesk/customer-portal",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
