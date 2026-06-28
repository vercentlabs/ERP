export const barcodeRejectWorkflow = {
  module: "inventory/barcode",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/barcode record ${recordId}`;
  },
};
