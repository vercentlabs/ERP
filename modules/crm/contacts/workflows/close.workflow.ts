export const contactsCloseWorkflow = {
  module: "crm/contacts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/contacts record ${recordId}`;
  },
};
