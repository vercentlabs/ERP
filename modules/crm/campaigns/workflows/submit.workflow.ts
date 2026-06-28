export const campaignsSubmitWorkflow = {
  module: "crm/campaigns",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/campaigns record ${recordId}`;
  },
};
