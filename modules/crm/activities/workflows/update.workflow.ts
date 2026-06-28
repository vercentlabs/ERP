export const activitiesUpdateWorkflow = {
  module: "crm/activities",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/activities record ${recordId}`;
  },
};
