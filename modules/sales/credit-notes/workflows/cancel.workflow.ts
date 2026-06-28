export const creditNotesCancelWorkflow = {
  module: "sales/credit-notes",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/credit-notes record ${recordId}`;
  },
};
