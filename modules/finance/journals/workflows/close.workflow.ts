export const journalsCloseWorkflow = {
  module: "finance/journals",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/journals record ${recordId}`;
  },
};
