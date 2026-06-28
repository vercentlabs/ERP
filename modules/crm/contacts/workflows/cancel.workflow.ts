export const contactsCancelWorkflow = {
  module: "crm/contacts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/contacts record ${recordId}`;
  },
};
