export const operationalDataStoreRejectWorkflow = {
  module: "data-platform/operational-data-store",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
