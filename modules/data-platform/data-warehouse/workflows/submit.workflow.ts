export const dataWarehouseSubmitWorkflow = {
  module: "data-platform/data-warehouse",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
