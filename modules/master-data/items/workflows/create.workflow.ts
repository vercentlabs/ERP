export const itemsCreateWorkflow = {
  module: "master-data/items",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/items record ${recordId}`;
  },
};
