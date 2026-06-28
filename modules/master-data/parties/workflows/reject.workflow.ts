export const partiesRejectWorkflow = {
  module: "master-data/parties",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/parties record ${recordId}`;
  },
};
