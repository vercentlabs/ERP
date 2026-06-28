export const deliveryNotesApproveWorkflow = {
  module: "sales/delivery-notes",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/delivery-notes record ${recordId}`;
  },
};
