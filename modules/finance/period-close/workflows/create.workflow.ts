export const periodCloseCreateWorkflow = {
  module: "finance/period-close",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/period-close record ${recordId}`;
  },
};
