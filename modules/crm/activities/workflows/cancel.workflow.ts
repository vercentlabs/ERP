export const activitiesCancelWorkflow = {
  module: "crm/activities",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/activities record ${recordId}`;
  },
};
