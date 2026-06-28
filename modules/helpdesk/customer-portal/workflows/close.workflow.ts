export const customerPortalCloseWorkflow = {
  module: "helpdesk/customer-portal",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
