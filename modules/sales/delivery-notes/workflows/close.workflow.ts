export const deliveryNotesCloseWorkflow = {
  module: "sales/delivery-notes",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/delivery-notes record ${recordId}`;
  },
};
