export const partiesUpdateWorkflow = {
  module: "master-data/parties",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/parties record ${recordId}`;
  },
};
