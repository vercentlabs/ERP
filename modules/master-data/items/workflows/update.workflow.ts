export const itemsUpdateWorkflow = {
  module: "master-data/items",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/items record ${recordId}`;
  },
};
