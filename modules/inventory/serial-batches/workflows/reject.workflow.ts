export const serialBatchesRejectWorkflow = {
  module: "inventory/serial-batches",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/serial-batches record ${recordId}`;
  },
};
