export const periodCloseCancelWorkflow = {
  module: "finance/period-close",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/period-close record ${recordId}`;
  },
};
