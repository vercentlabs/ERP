export const accountsUpdateWorkflow = {
  module: "crm/accounts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/accounts record ${recordId}`;
  },
};
