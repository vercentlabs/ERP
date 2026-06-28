export const carbonAccountingApproveWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
