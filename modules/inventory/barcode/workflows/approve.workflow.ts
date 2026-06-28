export const barcodeApproveWorkflow = {
  module: "inventory/barcode",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/barcode record ${recordId}`;
  },
};
