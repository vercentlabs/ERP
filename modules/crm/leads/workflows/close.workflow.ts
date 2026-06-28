export const leadsCloseWorkflow = {
  module: "crm/leads",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/leads record ${recordId}`;
  },
};
