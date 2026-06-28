export const locationsUpdateWorkflow = {
  module: "inventory/locations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/locations record ${recordId}`;
  },
};
