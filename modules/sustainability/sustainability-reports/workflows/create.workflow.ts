export const sustainabilityReportsCreateWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
