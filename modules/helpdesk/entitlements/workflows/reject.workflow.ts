export const entitlementsRejectWorkflow = {
  module: "helpdesk/entitlements",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/entitlements record ${recordId}`;
  },
};
