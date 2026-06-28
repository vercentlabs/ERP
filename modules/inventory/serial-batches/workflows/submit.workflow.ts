export const serialBatchesSubmitWorkflow = {
  module: "inventory/serial-batches",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/serial-batches record ${recordId}`;
  },
};
