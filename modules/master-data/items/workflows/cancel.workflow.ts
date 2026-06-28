export const itemsCancelWorkflow = {
  module: "master-data/items",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/items record ${recordId}`;
  },
};
