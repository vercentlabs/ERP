export const campaignsRejectWorkflow = {
  module: "crm/campaigns",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/campaigns record ${recordId}`;
  },
};
