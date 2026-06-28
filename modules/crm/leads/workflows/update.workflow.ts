export const leadsUpdateWorkflow = {
  module: "crm/leads",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/leads record ${recordId}`;
  },
};
