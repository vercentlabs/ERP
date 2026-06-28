export const statutoryReportsSubmitWorkflow = {
  module: "compliance/statutory-reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/statutory-reports record ${recordId}`;
  },
};
