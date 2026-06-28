export const customer360SubmitWorkflow = {
  module: "crm/customer-360",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/customer-360 record ${recordId}`;
  },
};
