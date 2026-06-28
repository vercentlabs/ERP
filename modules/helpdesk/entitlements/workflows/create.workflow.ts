export const entitlementsCreateWorkflow = {
  module: "helpdesk/entitlements",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/entitlements record ${recordId}`;
  },
};
