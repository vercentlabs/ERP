export const segregationOfDutiesApproveWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
