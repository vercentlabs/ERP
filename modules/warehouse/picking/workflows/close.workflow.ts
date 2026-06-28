export const pickingCloseWorkflow = {
  module: "warehouse/picking",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/picking record ${recordId}`;
  },
};
