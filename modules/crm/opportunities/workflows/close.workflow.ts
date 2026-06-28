export const opportunitiesCloseWorkflow = {
  module: "crm/opportunities",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/opportunities record ${recordId}`;
  },
};
