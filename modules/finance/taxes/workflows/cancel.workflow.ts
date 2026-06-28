export const taxesCancelWorkflow = {
  module: "finance/taxes",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/taxes record ${recordId}`;
  },
};
