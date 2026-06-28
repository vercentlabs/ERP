export const contactsSubmitWorkflow = {
  module: "crm/contacts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/contacts record ${recordId}`;
  },
};
