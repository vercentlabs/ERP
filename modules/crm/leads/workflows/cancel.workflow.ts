export const leadsCancelWorkflow = {
  module: "crm/leads",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/leads record ${recordId}`;
  },
};
