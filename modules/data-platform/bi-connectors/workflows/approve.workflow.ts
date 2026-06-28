export const biConnectorsApproveWorkflow = {
  module: "data-platform/bi-connectors",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
