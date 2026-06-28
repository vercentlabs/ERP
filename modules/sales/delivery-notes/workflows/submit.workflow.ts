export const deliveryNotesSubmitWorkflow = {
  module: "sales/delivery-notes",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/delivery-notes record ${recordId}`;
  },
};
