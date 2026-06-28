export const operationalDataStoreCreateWorkflow = {
  module: "data-platform/operational-data-store",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
