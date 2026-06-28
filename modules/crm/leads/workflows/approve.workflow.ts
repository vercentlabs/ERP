export const leadsApproveWorkflow = {
  module: "crm/leads",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/leads record ${recordId}`;
  },
};
