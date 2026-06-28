export const creditNotesSubmitWorkflow = {
  module: "sales/credit-notes",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/credit-notes record ${recordId}`;
  },
};
