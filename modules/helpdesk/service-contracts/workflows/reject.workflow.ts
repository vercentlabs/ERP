export const serviceContractsRejectWorkflow = {
  module: "helpdesk/service-contracts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
