export const packingCreateWorkflow = {
  module: "warehouse/packing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/packing record ${recordId}`;
  },
};
