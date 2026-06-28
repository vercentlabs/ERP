export const locationsRejectWorkflow = {
  module: "inventory/locations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/locations record ${recordId}`;
  },
};
