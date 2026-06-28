export const barcodeCloseWorkflow = {
  module: "inventory/barcode",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/barcode record ${recordId}`;
  },
};
