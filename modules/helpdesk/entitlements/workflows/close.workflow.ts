export const entitlementsCloseWorkflow = {
  module: "helpdesk/entitlements",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/entitlements record ${recordId}`;
  },
};
