export const dataWarehouseUpdateWorkflow = {
  module: "data-platform/data-warehouse",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
