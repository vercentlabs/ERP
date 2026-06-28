export const segregationOfDutiesCreateWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
