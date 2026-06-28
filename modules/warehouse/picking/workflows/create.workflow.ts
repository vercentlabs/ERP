export const pickingCreateWorkflow = {
  module: "warehouse/picking",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/picking record ${recordId}`;
  },
};
