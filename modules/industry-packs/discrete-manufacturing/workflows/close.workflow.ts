export const discreteManufacturingCloseWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
