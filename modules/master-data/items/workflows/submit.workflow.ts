export const itemsSubmitWorkflow = {
  module: "master-data/items",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/items record ${recordId}`;
  },
};
