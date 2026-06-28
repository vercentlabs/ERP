export const itemsCloseWorkflow = {
  module: "master-data/items",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/items record ${recordId}`;
  },
};
