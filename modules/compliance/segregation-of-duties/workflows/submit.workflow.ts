export const segregationOfDutiesSubmitWorkflow = {
  module: "compliance/segregation-of-duties",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/segregation-of-duties record ${recordId}`;
  },
};
