export const accountsCloseWorkflow = {
  module: "crm/accounts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/accounts record ${recordId}`;
  },
};
