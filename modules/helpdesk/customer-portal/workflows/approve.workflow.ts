export const customerPortalApproveWorkflow = {
  module: "helpdesk/customer-portal",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/customer-portal record ${recordId}`;
  },
};
