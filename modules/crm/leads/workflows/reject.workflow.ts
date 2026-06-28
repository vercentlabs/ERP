export const leadsRejectWorkflow = {
  module: "crm/leads",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/leads record ${recordId}`;
  },
};
