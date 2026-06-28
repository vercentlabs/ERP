export const serialBatchesCancelWorkflow = {
  module: "inventory/serial-batches",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/serial-batches record ${recordId}`;
  },
};
