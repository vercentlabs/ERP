export const campaignsCancelWorkflow = {
  module: "crm/campaigns",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/campaigns record ${recordId}`;
  },
};
