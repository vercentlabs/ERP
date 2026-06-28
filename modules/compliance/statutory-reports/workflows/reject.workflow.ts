export const statutoryReportsRejectWorkflow = {
  module: "compliance/statutory-reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/statutory-reports record ${recordId}`;
  },
};
