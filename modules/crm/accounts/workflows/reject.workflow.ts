export const accountsRejectWorkflow = {
  module: "crm/accounts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/accounts record ${recordId}`;
  },
};
