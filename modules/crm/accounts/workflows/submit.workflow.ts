export const accountsSubmitWorkflow = {
  module: "crm/accounts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/accounts record ${recordId}`;
  },
};
