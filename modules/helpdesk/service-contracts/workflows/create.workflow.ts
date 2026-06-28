export const serviceContractsCreateWorkflow = {
  module: "helpdesk/service-contracts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/service-contracts record ${recordId}`;
  },
};
