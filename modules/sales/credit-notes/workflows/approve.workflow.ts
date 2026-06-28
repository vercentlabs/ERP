export const creditNotesApproveWorkflow = {
  module: "sales/credit-notes",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/credit-notes record ${recordId}`;
  },
};
