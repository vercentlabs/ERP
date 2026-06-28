export const entitlementsSubmitWorkflow = {
  module: "helpdesk/entitlements",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/entitlements record ${recordId}`;
  },
};
