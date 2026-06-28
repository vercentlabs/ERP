export const periodCloseUpdateWorkflow = {
  module: "finance/period-close",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/period-close record ${recordId}`;
  },
};
