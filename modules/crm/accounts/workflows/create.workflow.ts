export const accountsCreateWorkflow = {
  module: "crm/accounts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/accounts record ${recordId}`;
  },
};
