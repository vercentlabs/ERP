export const returnsApproveWorkflow = {
  module: "sales/returns",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/returns record ${recordId}`;
  },
};
