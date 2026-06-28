export const activitiesApproveWorkflow = {
  module: "crm/activities",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/activities record ${recordId}`;
  },
};
