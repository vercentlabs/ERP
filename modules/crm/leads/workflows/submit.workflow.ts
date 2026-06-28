export const leadsSubmitWorkflow = {
  module: "crm/leads",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/leads record ${recordId}`;
  },
};
