export const locationsCancelWorkflow = {
  module: "inventory/locations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/locations record ${recordId}`;
  },
};
