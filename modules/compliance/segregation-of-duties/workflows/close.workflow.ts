export const segregationOfDutiesCloseWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
