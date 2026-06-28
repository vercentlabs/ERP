export const emissionsApproveWorkflow = {
  module: "sustainability/emissions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/emissions record ${recordId}`;
  },
};
