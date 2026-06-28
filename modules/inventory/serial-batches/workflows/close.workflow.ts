export const serialBatchesCloseWorkflow = {
  module: "inventory/serial-batches",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/serial-batches record ${recordId}`;
  },
};
