export const customer360ApproveWorkflow = {
  module: "crm/customer-360",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/customer-360 record ${recordId}`;
  },
};
