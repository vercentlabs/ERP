export const dataWarehouseRejectWorkflow = {
  module: "data-platform/data-warehouse",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
