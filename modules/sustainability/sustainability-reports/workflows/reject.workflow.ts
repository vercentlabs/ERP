export const sustainabilityReportsRejectWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
