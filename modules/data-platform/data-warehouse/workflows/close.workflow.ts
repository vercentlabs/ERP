export const dataWarehouseCloseWorkflow = {
  module: "data-platform/data-warehouse",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
