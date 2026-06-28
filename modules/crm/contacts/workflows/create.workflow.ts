export const contactsCreateWorkflow = {
  module: "crm/contacts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/contacts record ${recordId}`;
  },
};
