export const customersApproveWorkflow = {
  module: "crm/customers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/customers record ${recordId}`;
  },
};
