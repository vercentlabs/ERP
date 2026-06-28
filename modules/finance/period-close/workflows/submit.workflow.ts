export const periodCloseSubmitWorkflow = {
  module: "finance/period-close",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/period-close record ${recordId}`;
  },
};
