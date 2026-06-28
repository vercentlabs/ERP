export const serialBatchesUpdateWorkflow = {
  module: "inventory/serial-batches",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/serial-batches record ${recordId}`;
  },
};
