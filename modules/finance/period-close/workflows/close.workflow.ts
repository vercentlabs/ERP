export const periodCloseCloseWorkflow = {
  module: "finance/period-close",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/period-close record ${recordId}`;
  },
};
