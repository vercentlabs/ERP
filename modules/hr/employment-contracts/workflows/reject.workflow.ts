export const employmentContractsRejectWorkflow = {
  module: "hr/employment-contracts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/employment-contracts record ${recordId}`;
  },
};
