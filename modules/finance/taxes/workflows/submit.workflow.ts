export const taxesSubmitWorkflow = {
  module: "finance/taxes",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/taxes record ${recordId}`;
  },
};
