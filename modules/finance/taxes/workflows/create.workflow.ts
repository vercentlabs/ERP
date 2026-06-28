export const taxesCreateWorkflow = {
  module: "finance/taxes",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/taxes record ${recordId}`;
  },
};
