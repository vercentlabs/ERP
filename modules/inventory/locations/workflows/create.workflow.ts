export const locationsCreateWorkflow = {
  module: "inventory/locations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/locations record ${recordId}`;
  },
};
