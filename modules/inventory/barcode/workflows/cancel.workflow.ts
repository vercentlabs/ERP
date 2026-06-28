export const barcodeCancelWorkflow = {
  module: "inventory/barcode",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/barcode record ${recordId}`;
  },
};
