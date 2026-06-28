export const accountsApproveWorkflow = {
  module: "crm/accounts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/accounts record ${recordId}`;
  },
};
