export const customersRejectWorkflow = {
  module: "crm/customers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/customers record ${recordId}`;
  },
};
