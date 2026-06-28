export const activitiesCreateWorkflow = {
  module: "crm/activities",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/activities record ${recordId}`;
  },
};
