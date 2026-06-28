export const employmentContractsCreateWorkflow = {
  module: "hr/employment-contracts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/employment-contracts record ${recordId}`;
  },
};
