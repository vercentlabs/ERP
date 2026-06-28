export const segregationOfDutiesUpdateWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
