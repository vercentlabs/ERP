export const customer360RejectWorkflow = {
  module: "crm/customer-360",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/customer-360 record ${recordId}`;
  },
};
