export const partiesCreateWorkflow = {
  module: "master-data/parties",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/parties record ${recordId}`;
  },
};
