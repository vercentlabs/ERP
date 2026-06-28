export const serviceContractsCancelWorkflow = {
  module: "helpdesk/service-contracts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
