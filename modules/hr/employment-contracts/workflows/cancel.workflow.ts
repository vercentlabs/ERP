export const employmentContractsCancelWorkflow = {
  module: "hr/employment-contracts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/employment-contracts record ${recordId}`;
  },
};
