export const operationalDataStoreUpdateWorkflow = {
  module: "data-platform/operational-data-store",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
