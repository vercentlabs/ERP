export const serialBatchesCreateWorkflow = {
  module: "inventory/serial-batches",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/serial-batches record ${recordId}`;
  },
};
