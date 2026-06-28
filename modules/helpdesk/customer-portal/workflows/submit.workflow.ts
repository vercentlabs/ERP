export const customerPortalSubmitWorkflow = {
  module: "helpdesk/customer-portal",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
