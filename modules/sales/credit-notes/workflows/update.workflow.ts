export const creditNotesUpdateWorkflow = {
  module: "sales/credit-notes",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/credit-notes record ${recordId}`;
  },
};
