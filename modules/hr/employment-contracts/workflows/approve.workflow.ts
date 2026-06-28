export const employmentContractsApproveWorkflow = {
  module: "hr/employment-contracts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/employment-contracts record ${recordId}`;
  },
};
