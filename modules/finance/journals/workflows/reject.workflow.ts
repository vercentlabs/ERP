export const journalsRejectWorkflow = {
  module: "finance/journals",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/journals record ${recordId}`;
  },
};
