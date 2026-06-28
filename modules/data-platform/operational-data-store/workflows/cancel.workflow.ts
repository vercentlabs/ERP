export const operationalDataStoreCancelWorkflow = {
  module: "data-platform/operational-data-store",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/operational-data-store record ${recordId}`;
  },
};
