export const quotationsApproveWorkflow = {
  module: "sales/quotations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/quotations record ${recordId}`;
  },
};
