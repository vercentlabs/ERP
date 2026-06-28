export const deliveryNotesUpdateWorkflow = {
  module: "sales/delivery-notes",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/delivery-notes record ${recordId}`;
  },
};
