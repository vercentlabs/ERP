export const dataWarehouseCancelWorkflow = {
  module: "data-platform/data-warehouse",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
