export const customersSubmitWorkflow = {
  module: "crm/customers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/customers record ${recordId}`;
  },
};
