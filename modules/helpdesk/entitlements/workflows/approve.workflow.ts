export const entitlementsApproveWorkflow = {
  module: "helpdesk/entitlements",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/entitlements record ${recordId}`;
  },
};
