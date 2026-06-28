export const leadsCreateWorkflow = {
  module: "crm/leads",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/leads record ${recordId}`;
  },
};
