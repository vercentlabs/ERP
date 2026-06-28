export const biConnectorsUpdateWorkflow = {
  module: "data-platform/bi-connectors",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
