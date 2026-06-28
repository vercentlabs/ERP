export const taxesRejectWorkflow = {
  module: "finance/taxes",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/taxes record ${recordId}`;
  },
};
