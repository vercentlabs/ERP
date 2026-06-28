export const discreteManufacturingUpdateWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
