export const statutoryReportsCreateWorkflow = {
  module: "compliance/statutory-reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/statutory-reports record ${recordId}`;
  },
};
