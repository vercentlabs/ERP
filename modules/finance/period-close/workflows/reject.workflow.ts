export const periodCloseRejectWorkflow = {
  module: "finance/period-close",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/period-close record ${recordId}`;
  },
};
