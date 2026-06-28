export const campaignsCloseWorkflow = {
  module: "crm/campaigns",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/campaigns record ${recordId}`;
  },
};
