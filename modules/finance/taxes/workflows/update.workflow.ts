export const taxesUpdateWorkflow = {
  module: "finance/taxes",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/taxes record ${recordId}`;
  },
};
