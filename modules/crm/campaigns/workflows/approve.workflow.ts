export const campaignsApproveWorkflow = {
  module: "crm/campaigns",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/campaigns record ${recordId}`;
  },
};
