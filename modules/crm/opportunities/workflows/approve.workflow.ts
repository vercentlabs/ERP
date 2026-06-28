export const opportunitiesApproveWorkflow = {
  module: "crm/opportunities",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/opportunities record ${recordId}`;
  },
};
