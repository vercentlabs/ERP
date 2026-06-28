export const activitiesSubmitWorkflow = {
  module: "crm/activities",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/activities record ${recordId}`;
  },
};
