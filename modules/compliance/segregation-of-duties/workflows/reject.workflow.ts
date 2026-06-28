export const segregationOfDutiesRejectWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
