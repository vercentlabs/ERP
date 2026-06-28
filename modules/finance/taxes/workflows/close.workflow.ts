export const taxesCloseWorkflow = {
  module: "finance/taxes",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/taxes record ${recordId}`;
  },
};
