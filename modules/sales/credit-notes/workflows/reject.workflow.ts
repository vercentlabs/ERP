export const creditNotesRejectWorkflow = {
  module: "sales/credit-notes",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/credit-notes record ${recordId}`;
  },
};
