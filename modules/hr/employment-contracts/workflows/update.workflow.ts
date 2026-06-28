export const employmentContractsUpdateWorkflow = {
  module: "hr/employment-contracts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/employment-contracts record ${recordId}`;
  },
};
