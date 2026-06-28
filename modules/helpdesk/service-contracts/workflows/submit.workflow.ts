export const serviceContractsSubmitWorkflow = {
  module: "helpdesk/service-contracts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
