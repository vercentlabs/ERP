export const contactsRejectWorkflow = {
  module: "crm/contacts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/contacts record ${recordId}`;
  },
};
