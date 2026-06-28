export const discreteManufacturingSubmitWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
