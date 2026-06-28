export const campaignsCreateWorkflow = {
  module: "crm/campaigns",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/campaigns record ${recordId}`;
  },
};
