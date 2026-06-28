export const barcodeCreateWorkflow = {
  module: "inventory/barcode",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/barcode record ${recordId}`;
  },
};
