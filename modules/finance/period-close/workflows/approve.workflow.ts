export const periodCloseApproveWorkflow = {
  module: "finance/period-close",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/period-close record ${recordId}`;
  },
};
