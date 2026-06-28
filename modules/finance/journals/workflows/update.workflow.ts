export const journalsUpdateWorkflow = {
  module: "finance/journals",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/journals record ${recordId}`;
  },
};
