export const sustainabilityReportsSubmitWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
