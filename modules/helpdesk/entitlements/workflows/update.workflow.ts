export const entitlementsUpdateWorkflow = {
  module: "helpdesk/entitlements",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/entitlements record ${recordId}`;
  },
};
