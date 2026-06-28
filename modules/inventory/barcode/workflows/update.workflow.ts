export const barcodeUpdateWorkflow = {
  module: "inventory/barcode",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/barcode record ${recordId}`;
  },
};
