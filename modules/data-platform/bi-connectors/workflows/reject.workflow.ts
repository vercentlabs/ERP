export const biConnectorsRejectWorkflow = {
  module: "data-platform/bi-connectors",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
