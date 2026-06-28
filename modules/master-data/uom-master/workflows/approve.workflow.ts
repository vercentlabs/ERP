export const uomMasterApproveWorkflow = {
  module: "master-data/uom-master",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/uom-master record ${recordId}`;
  },
};
