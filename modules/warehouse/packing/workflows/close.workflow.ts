export const packingCloseWorkflow = {
  module: "warehouse/packing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/packing record ${recordId}`;
  },
};
