export const itemsRejectWorkflow = {
  module: "master-data/items",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/items record ${recordId}`;
  },
};
