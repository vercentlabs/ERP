export const biConnectorsCloseWorkflow = {
  module: "data-platform/bi-connectors",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
