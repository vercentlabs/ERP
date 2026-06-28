export const employmentContractsSubmitWorkflow = {
  module: "hr/employment-contracts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/employment-contracts record ${recordId}`;
  },
};
