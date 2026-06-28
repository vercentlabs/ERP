export const deliveryNotesCreateWorkflow = {
  module: "sales/delivery-notes",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/delivery-notes record ${recordId}`;
  },
};
