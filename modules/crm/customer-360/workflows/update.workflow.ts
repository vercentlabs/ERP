export const customer360UpdateWorkflow = {
  module: "crm/customer-360",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/customer-360 record ${recordId}`;
  },
};
