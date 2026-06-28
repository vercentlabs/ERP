export const taxesApproveWorkflow = {
  module: "finance/taxes",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/taxes record ${recordId}`;
  },
};
