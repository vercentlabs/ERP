export const contactsApproveWorkflow = {
  module: "crm/contacts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/contacts record ${recordId}`;
  },
};
