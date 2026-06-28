export const opportunitiesSubmitWorkflow = {
  module: "crm/opportunities",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/opportunities record ${recordId}`;
  },
};
