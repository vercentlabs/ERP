export const journalsCancelWorkflow = {
  module: "finance/journals",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/journals record ${recordId}`;
  },
};
