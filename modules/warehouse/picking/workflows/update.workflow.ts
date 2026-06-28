export const pickingUpdateWorkflow = {
  module: "warehouse/picking",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/picking record ${recordId}`;
  },
};
