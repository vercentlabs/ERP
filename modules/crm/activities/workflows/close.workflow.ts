export const activitiesCloseWorkflow = {
  module: "crm/activities",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/activities record ${recordId}`;
  },
};
