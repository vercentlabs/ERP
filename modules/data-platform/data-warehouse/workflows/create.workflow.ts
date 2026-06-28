export const dataWarehouseCreateWorkflow = {
  module: "data-platform/data-warehouse",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
