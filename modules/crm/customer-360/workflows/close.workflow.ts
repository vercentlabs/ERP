export const customer360CloseWorkflow = {
  module: "crm/customer-360",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/customer-360 record ${recordId}`;
  },
};
