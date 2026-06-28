export const creditNotesCreateWorkflow = {
  module: "sales/credit-notes",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/credit-notes record ${recordId}`;
  },
};
