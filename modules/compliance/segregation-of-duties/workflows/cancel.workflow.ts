export const segregationOfDutiesCancelWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
