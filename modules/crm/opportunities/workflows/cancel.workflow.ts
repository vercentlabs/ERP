export const opportunitiesCancelWorkflow = {
  module: "crm/opportunities",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/opportunities record ${recordId}`;
  },
};
