export const wavesCreateWorkflow = {
  module: "warehouse/waves",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/waves record ${recordId}`;
  },
};
