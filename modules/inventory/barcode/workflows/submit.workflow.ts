export const barcodeSubmitWorkflow = {
  module: "inventory/barcode",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/barcode record ${recordId}`;
  },
};
