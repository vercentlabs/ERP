export const journalsSubmitWorkflow = {
  module: "finance/journals",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/journals record ${recordId}`;
  },
};
