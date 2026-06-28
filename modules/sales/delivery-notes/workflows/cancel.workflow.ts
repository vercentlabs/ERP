export const deliveryNotesCancelWorkflow = {
  module: "sales/delivery-notes",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/delivery-notes record ${recordId}`;
  },
};
