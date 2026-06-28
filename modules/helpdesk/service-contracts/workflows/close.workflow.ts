export const serviceContractsCloseWorkflow = {
  module: "helpdesk/service-contracts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
