export const locationsCloseWorkflow = {
  module: "inventory/locations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/locations record ${recordId}`;
  },
};
