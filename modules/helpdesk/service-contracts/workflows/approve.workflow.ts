export const serviceContractsApproveWorkflow = {
  module: "helpdesk/service-contracts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
