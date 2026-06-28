export const deliveryNotesRejectWorkflow = {
  module: "sales/delivery-notes",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/delivery-notes record ${recordId}`;
  },
};
