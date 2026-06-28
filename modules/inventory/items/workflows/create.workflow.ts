export const itemsCreateWorkflow = {
  module: "inventory/items",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/items record ${recordId}`;
  },
};
