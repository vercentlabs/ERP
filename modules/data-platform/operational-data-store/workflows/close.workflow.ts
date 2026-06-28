export const operationalDataStoreCloseWorkflow = {
  module: "data-platform/operational-data-store",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
