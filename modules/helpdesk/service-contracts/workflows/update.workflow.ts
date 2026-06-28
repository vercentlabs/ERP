export const serviceContractsUpdateWorkflow = {
  module: "helpdesk/service-contracts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
