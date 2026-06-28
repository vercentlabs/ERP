export const creditNotesCloseWorkflow = {
  module: "sales/credit-notes",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/credit-notes record ${recordId}`;
  },
};
