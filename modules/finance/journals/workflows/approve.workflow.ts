export const journalsApproveWorkflow = {
  module: "finance/journals",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/journals record ${recordId}`;
  },
};
