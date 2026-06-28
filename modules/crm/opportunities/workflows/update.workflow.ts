export const opportunitiesUpdateWorkflow = {
  module: "crm/opportunities",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/opportunities record ${recordId}`;
  },
};
