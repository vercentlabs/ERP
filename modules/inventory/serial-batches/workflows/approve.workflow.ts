export const serialBatchesApproveWorkflow = {
  module: "inventory/serial-batches",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/serial-batches record ${recordId}`;
  },
};
