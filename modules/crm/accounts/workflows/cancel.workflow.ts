export const accountsCancelWorkflow = {
  module: "crm/accounts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/accounts record ${recordId}`;
  },
};
