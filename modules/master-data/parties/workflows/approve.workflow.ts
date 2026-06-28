export const partiesApproveWorkflow = {
  module: "master-data/parties",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/parties record ${recordId}`;
  },
};
