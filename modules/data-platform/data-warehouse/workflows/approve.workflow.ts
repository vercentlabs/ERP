export const dataWarehouseApproveWorkflow = {
  module: "data-platform/data-warehouse",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/data-warehouse record ${recordId}`;
  },
};
