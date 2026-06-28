export const opportunitiesCreateWorkflow = {
  module: "crm/opportunities",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/opportunities record ${recordId}`;
  },
};
