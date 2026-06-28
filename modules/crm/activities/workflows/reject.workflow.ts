export const activitiesRejectWorkflow = {
  module: "crm/activities",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/activities record ${recordId}`;
  },
};
