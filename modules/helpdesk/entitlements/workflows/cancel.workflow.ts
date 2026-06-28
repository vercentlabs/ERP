export const entitlementsCancelWorkflow = {
  module: "helpdesk/entitlements",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/entitlements record ${recordId}`;
  },
};
