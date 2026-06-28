export const employmentContractsCloseWorkflow = {
  module: "hr/employment-contracts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/employment-contracts record ${recordId}`;
  },
};
