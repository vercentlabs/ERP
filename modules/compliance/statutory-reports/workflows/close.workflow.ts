export const statutoryReportsCloseWorkflow = {
  module: "compliance/statutory-reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/statutory-reports record ${recordId}`;
  },
};
