export const campaignsUpdateWorkflow = {
  module: "crm/campaigns",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/campaigns record ${recordId}`;
  },
};
