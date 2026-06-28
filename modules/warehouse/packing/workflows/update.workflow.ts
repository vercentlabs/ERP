export const packingUpdateWorkflow = {
  module: "warehouse/packing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/packing record ${recordId}`;
  },
};
