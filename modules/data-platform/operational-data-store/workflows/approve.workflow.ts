export const operationalDataStoreApproveWorkflow = {
  module: "data-platform/operational-data-store",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
