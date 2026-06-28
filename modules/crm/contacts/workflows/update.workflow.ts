export const contactsUpdateWorkflow = {
  module: "crm/contacts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/contacts record ${recordId}`;
  },
};
