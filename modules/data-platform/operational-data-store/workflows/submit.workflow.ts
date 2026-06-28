export const operationalDataStoreSubmitWorkflow = {
  module: "data-platform/operational-data-store",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
