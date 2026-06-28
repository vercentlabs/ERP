export const locationsApproveWorkflow = {
  module: "master-data/locations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/locations record ${recordId}`;
  },
};
